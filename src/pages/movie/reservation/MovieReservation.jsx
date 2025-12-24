import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import S from "./style";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const formatKoreanDate = (dateValue) => {
  if (!dateValue) return "-";
  const d = new Date(dateValue);
  if (Number.isNaN(d.getTime())) return String(dateValue);

  return d.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function MovieReservation() {
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.user?.currentUser);
  const userId = currentUser?.id;
  const userName = currentUser?.userName;

  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMyReservation = async () => {
    if (!userId) {
      setReservation(null);
      setError("로그인이 필요합니다.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${BACKEND_URL}/reservations/my/${userId}`, {
        method: "GET",
        credentials: "include",
      });

      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        throw new Error("서버 응답이 JSON이 아닙니다.");
      }

      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || "내 예약 조회 실패");

      const list = Array.isArray(json?.data) ? json.data : [];
      setReservation(list.length > 0 ? list[0] : null);
    } catch (e) {
      setReservation(null);
      setError(e?.message || "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyReservation();
  }, [userId]);

  const handleCancel = async () => {
    if (!reservation?.id) return;

    const ok = window.confirm("예약을 취소할까요?");
    if (!ok) return;

    try {
      const res = await fetch(`${BACKEND_URL}/reservations/${reservation.id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        alert("예약이 취소되었습니다.");
        fetchMyReservation(); // 목록 갱신
        return;
      }

      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        throw new Error("예약 취소 실패");
      }

      const json = await res.json();
      throw new Error(json?.message || "예약 취소 실패");
    } catch (e) {
      alert(e?.message || "예약 취소 중 오류가 발생했습니다.");
    }
  };

  const goMain = () => navigate("/");

  // 공통 레이아웃 래퍼 컴포넌트
  const LayoutWrapper = ({ children, title = "영화 예약 내역" }) => (
    <S.Page>
      <S.CompleteWrap>
        <S.CompleteCard>
          <S.CompleteTitle>{title}</S.CompleteTitle>
          <S.CompleteDivider />
          {children}
        </S.CompleteCard>
      </S.CompleteWrap>
    </S.Page>
  );

  if (loading) {
    return (
      <LayoutWrapper>
        <S.MessageText>로딩중...</S.MessageText>
      </LayoutWrapper>
    );
  }

  if (error) {
    return (
      <LayoutWrapper>
        <S.MessageText $error>{error}</S.MessageText>
        <S.CompleteButtonRow>
          <S.CompleteSecondaryButton type="button" onClick={goMain}>
            메인 페이지로 이동
          </S.CompleteSecondaryButton>
        </S.CompleteButtonRow>
      </LayoutWrapper>
    );
  }

  // 예약 내역이 없을 때
  if (!reservation) {
    return (
      <LayoutWrapper>
        <S.MessageText>예약 내역이 없습니다.</S.MessageText>
        <S.CompleteButtonRow>
          <S.CompleteSecondaryButton type="button" onClick={goMain}>
            메인 페이지로 이동
          </S.CompleteSecondaryButton>
        </S.CompleteButtonRow>
      </LayoutWrapper>
    );
  }

  // 예약 내역이 있을 때 (정상 출력)
  return (
    <S.Page>
      <S.CompleteWrap>
        <S.CompleteCard>
          <S.CompleteTitle>영화 예약 내역</S.CompleteTitle>
          <S.CompleteDivider />

          <S.CompleteTable>
            <S.CompleteRow>
              <S.CompleteTh>예약자명</S.CompleteTh>
              <S.CompleteTd>
                {userName || reservation.user?.userName || "-"}
              </S.CompleteTd>
            </S.CompleteRow>

            <S.CompleteRow>
              <S.CompleteTh>날짜</S.CompleteTh>
              <S.CompleteTd>
                {formatKoreanDate(reservation.movie?.movieStartDate)}
              </S.CompleteTd>
            </S.CompleteRow>

            <S.CompleteRow>
              <S.CompleteTh>학교명</S.CompleteTh>
              <S.CompleteTd>
                {reservation.school?.schoolName || "-"}
              </S.CompleteTd>
            </S.CompleteRow>

            <S.CompleteRow>
              <S.CompleteTh>영화 제목</S.CompleteTh>
              <S.CompleteTd>
                {reservation.movie?.movieTitle || "-"}
              </S.CompleteTd>
            </S.CompleteRow>

            <S.CompleteRow>
              <S.CompleteTh>상영 시간</S.CompleteTh>
              <S.CompleteTd>
                {reservation.movie?.movieTime || "-"}
              </S.CompleteTd>
            </S.CompleteRow>

            <S.CompleteRow>
               <S.CompleteTh>상태</S.CompleteTh>
               <S.CompleteTd>예약 완료</S.CompleteTd>
            </S.CompleteRow>

          </S.CompleteTable>

          <S.CompleteButtonRow>
            <S.CompletePrimaryButton type="button" onClick={handleCancel}>
              예약 취소
            </S.CompletePrimaryButton>
            <S.CompleteSecondaryButton type="button" onClick={goMain}>
              메인 페이지로 이동
            </S.CompleteSecondaryButton>
          </S.CompleteButtonRow>
        </S.CompleteCard>
      </S.CompleteWrap>
    </S.Page>
  );
}