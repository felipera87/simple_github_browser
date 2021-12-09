import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100vw;

  padding: 100px 200px;
`;

export const RepositoryInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  & > span {
    font-size: 18px;
  }

  & > h1 {
    color: #3f20ba;
    font-size: 35px;
  }
`;

export const OpenIssuesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  margin-top: 50px;
`;

export const OpenIssuesTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div {
    width: 20%;
  }

  & > h2 {
    color: #3f20ba;
    font-size: 30px;

    & > small {
      font-size: 18px;
    }
  }
`;

export const IssuesList = styled.ul`
  width: 100%;
  height: 450px;
  list-style: none;
  margin-top: 20px;
  border: 1px solid #3f20ba55;
  border-radius: 8px;
`;

export const IssueItem = styled.li`
  display: flex;
  justify-content: space-between;
  font-size: 18px;

  padding: 10px;

  & > span.issue-title {
    width: 70%;
  }
  & > span.issue-data {
    width: 25%;
    font-size: 14px;
    text-align: right;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:nth-child(even) {
    background-color: #3f20ba55;
  }

  &:last-child {
    border-radius: 0 0 8px 8px;
  }

  &:first-child {
    border-radius: 8px 8px 0 0;
  }
`;

export const EmptyIssueList = styled.div`
  width: 100%;
`;
