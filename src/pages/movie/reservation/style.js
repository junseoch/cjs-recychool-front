import styled from "styled-components";
import { h3Medium } from "../../../styles/common"; // 경로에 맞춰 수정 필요

const S = {};

S.Page = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
`;

S.CompleteWrap = styled.div`
  width: 920px;           
  margin: 0 auto;
  box-sizing: border-box;
  padding: 110px 0 140px;
`;

S.CompleteCard = styled.section`
  width: 100%;
`;

S.CompleteTitle = styled.h1`
  margin: 0;
  text-align: center;
  ${h3Medium} 
  color: #111;
`;

S.CompleteDivider = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 1px;
  background: rgba(0, 0, 0, 0.55);
`;


S.CompleteTable = styled.div`
  width: 100%;
`;

S.CompleteRow = styled.div`
  display: grid;
  grid-template-columns: 160px 1fr;
  min-height: 64px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
`;

S.CompleteTh = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 18px;
  font-size: 16px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.75);
  background: rgba(0, 0, 0, 0.04);
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

S.CompleteTd = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 28px;
  font-size: 18px;
  font-weight: 600;
  color: #111;
`;

/* 버튼 영역 */
S.CompleteButtonRow = styled.div`
  margin-top: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 48px;
`;

S.CompletePrimaryButton = styled.button`
  width: 360px;
  height: 56px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.PALETTE.primary.green.main};
  color: #fff;
`;

S.CompleteSecondaryButton = styled.button`
  width: 360px;
  height: 56px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
  background-color: #EFFBEA;
  color: rgba(0, 0, 0, 0.75);
`;


S.MessageText = styled.p`
  text-align: center;
  margin-top: 50px;
  font-size: 18px;
  color: #555;
  ${({ $error }) => $error && `color: red;`}
`;

export default S;