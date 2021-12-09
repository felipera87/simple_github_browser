import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { FiMessageSquare } from 'react-icons/fi';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';

import {
  Container,
  RepositoryInfoContainer,
  OpenIssuesContainer,
  OpenIssuesTitle,
  IssuesList,
  IssueItem,
  EmptyIssueList,
} from './styles';

import { REPOSITORY_OPEN_ISSUES } from '../../apollo/queries/repository';
import { CREATE_ISSUE } from '../../apollo/mutations/issues';

import getElapsedTime from '../../utils/getElapsedTime';

import Button from '../../components/Button';
import CreateIssueModal from '../../components/CreateIssueModal';

const RepositoryPage = () => {
  const [isCreateIssueModalOpen, setIsCreateIssueModalOpen] = useState(false);
  const [issuesList, setIssuesList] = useState([]);

  const { userLogin, repositoryName } = useParams();

  const [
    getRepository,
    {
      loading: isLoadingRepository,
      data: repositoryData,
      error: repositoryError,
    },
  ] = useLazyQuery(REPOSITORY_OPEN_ISSUES);

  const [createIssue, { loading: isLoadingCreatedIssue }] =
    useMutation(CREATE_ISSUE);

  useEffect(() => {
    if (repositoryName && userLogin) {
      getRepository({
        variables: {
          owner: userLogin,
          name: repositoryName,
          first: 20,
          filterBy: {
            states: ['OPEN'],
          },
        },
      });
    }
  }, [getRepository, repositoryName, userLogin]);

  const repository = useMemo(() => {
    let result = {
      id: '',
      name: '',
      stargazerCount: 0,
      watcherCount: 0,
    };

    if (repositoryData) {
      const {
        id,
        name,
        stargazerCount,
        watchers: { totalCount: watcherCount },
      } = repositoryData.repository;
      result = {
        id,
        name,
        stargazerCount,
        watcherCount,
      };
    }

    return result;
  }, [repositoryData]);

  const addIssuesToList = useCallback(newIssuesList => {
    setIssuesList(oldArray => [...oldArray, ...newIssuesList]);
  }, []);

  useEffect(() => {
    if (
      repositoryData &&
      repositoryData.repository &&
      repositoryData.repository.issues &&
      repositoryData.repository.issues.nodes
    ) {
      const newIssuesList = repositoryData.repository.issues.nodes.map(
        issue => {
          const {
            id,
            title,
            createdAt,
            number: issueNumber,
            author: { name: authorName },
            comments: { totalCount: commentCount },
          } = issue;

          const [elapsedTime, unit] = getElapsedTime(createdAt);

          return {
            id,
            title,
            createdAt,
            elapsedTime: `${elapsedTime} ${unit}`,
            issueNumber,
            authorName,
            commentCount,
          };
        },
      );
      addIssuesToList(newIssuesList);
    }
  }, [addIssuesToList, repositoryData]);

  const issuesPageInfo = useMemo(() => {
    if (
      repositoryData &&
      repositoryData.repository &&
      repositoryData.repository.issues
    ) {
      return { ...repositoryData.repository.issues.pageInfo };
    }
    return null;
  }, [repositoryData]);

  const fetchMoreIssues = useCallback(async () => {
    if (issuesPageInfo) {
      await getRepository({
        variables: {
          owner: userLogin,
          name: repositoryName,
          first: 20,
          filterBy: {
            states: ['OPEN'],
          },
          after: issuesPageInfo.endCursor,
        },
      });
    }
  }, [getRepository, issuesPageInfo, repositoryName, userLogin]);

  const handleCreateIssue = useCallback(
    async data => {
      await createIssue({
        variables: {
          input: {
            repositoryId: repository.id,
            title: data.title,
            body: data.description,
          },
        },
      });

      setIsCreateIssueModalOpen(false);

      setIssuesList([]);
      await getRepository({
        variables: {
          owner: userLogin,
          name: repositoryName,
          first: 20,
          filterBy: {
            states: ['OPEN'],
          },
        },
      });
    },
    [createIssue, getRepository, repository.id, repositoryName, userLogin],
  );

  return (
    <Container>
      <RepositoryInfoContainer>
        <h1>{repository.name}</h1>
        <span>
          {repository.stargazerCount} stars / {repository.watcherCount} watching
        </span>
      </RepositoryInfoContainer>
      <OpenIssuesContainer>
        <OpenIssuesTitle>
          <h2>
            Open Issues{' '}
            {issuesList.length > 0 && <small>({issuesList.length})</small>}
          </h2>
          <div>
            <Button
              type="button"
              onClick={() => setIsCreateIssueModalOpen(true)}
            >
              New Issue
            </Button>
          </div>
          <CreateIssueModal
            setIsModalOpen={setIsCreateIssueModalOpen}
            isOpen={isCreateIssueModalOpen}
            doAfterSubmit={handleCreateIssue}
            isLoading={isLoadingCreatedIssue}
            onBackgroundClick={() => setIsCreateIssueModalOpen(false)}
            onEscapeKeydown={() => setIsCreateIssueModalOpen(false)}
          />
        </OpenIssuesTitle>
        {isLoadingRepository && <h1>loading...</h1>}
        {repositoryError && <h1>error</h1>}
        {issuesList.length > 0 ? (
          <IssuesList>
            <InfiniteScroll
              dataLength={issuesList.length}
              next={fetchMoreIssues}
              hasMore={issuesPageInfo ? issuesPageInfo.hasNextPage : false}
              loader={<h5>Loading...</h5>}
              height={450}
            >
              {issuesList.map(issue => {
                return (
                  <IssueItem key={issue.id}>
                    <span className="issue-title">
                      <strong>Issue #{issue.issueNumber}:</strong> {issue.title}
                    </span>
                    <span className="issue-data">
                      ({issue.commentCount} <FiMessageSquare />){' '}
                      {issue.elapsedTime} ago by {issue.authorName}
                    </span>
                  </IssueItem>
                );
              })}
            </InfiniteScroll>
          </IssuesList>
        ) : (
          <EmptyIssueList />
        )}
      </OpenIssuesContainer>
    </Container>
  );
};

export default RepositoryPage;
