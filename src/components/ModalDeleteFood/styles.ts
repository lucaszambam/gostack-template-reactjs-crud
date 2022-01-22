import styled from 'styled-components';

export const Container = styled.div`
  padding: 48px 40px;
  display: flex;
  flex-direction: column;

  h1 {
    font-weight: 600;
    font-size: 36px;
    line-height: 36px;
    margin-bottom: 40px;
  }

  button {
    display: flex;
    justify-content: center;
    margin-top: 48px;
    align-self: flex-end;

    font-weight: 600;
    border-radius: 8px;
    border: 0;
    background: #ff4c4c;
    color: #fff;

    display: flex;
    flex-direction: row;
    align-items: center;

    .text {
      padding: 16px 24px;
    }

    .icon {
      display: flex;
      padding: 16px 16px;
      background: #ff6666;
      border-radius: 0 8px 8px 0;
      margin: 0 auto;
    }
  }
`;
