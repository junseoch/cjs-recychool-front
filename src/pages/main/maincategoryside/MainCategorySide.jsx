import React, { useMemo } from 'react';
import S from './style';
import { useQuery } from '@tanstack/react-query';

const MainCategorySide = () => {

    const formatKorean = (date, showYear = false) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return showYear ? `${year}년${month}월${day}일` : `${month}월${day}일`;
    };

    const dateRange = useMemo(() => {
        const today = new Date();
        const future = new Date();
        future.setDate(today.getDate() + 30);

        const showYear = today.getFullYear() !== future.getFullYear();
        return `${formatKorean(today)} ~ ${formatKorean(future, showYear)}`;
    }, [])

    // 현재 주차예약 가능한 학교
    const getParkingLot = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/school/parking-lot`)
        const parks = await response.json();
        return parks.data;
    }

    const { data } = useQuery({
        queryKey: ['parks'],
        queryFn: getParkingLot,
        select: (data) => data.map(item => ({ id: item.id, schoolName: item.schoolName, schoolImageName: item.schoolImageName }))
    });
    
    const parkingLot = data ?? [];

    // 현재 장소예약 가능한 학교
    const getPlaceLot = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/school/find-not-exist-school`)
        const places = await response.json();
        return places.data;
    }

    const { data: placeData } = useQuery({
        queryKey: ['places'],
        queryFn: getPlaceLot,
        select: (data) => data.map(item => ({ id: item.id, schoolName: item.schoolName, schoolImageName: item.schoolImageName }))
    });

    const placeLot = placeData ?? [];

    // 현재 무료영화 예약가능한 학교
    const getMovie = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/school/find-four-random`)
        const movies = await response.json();
        return movies.data;
    }

    const { data: movieData } = useQuery({
        queryKey: ['movies'],
        queryFn: getMovie,
        select: (data) => data.map(item => ({ id: item.id, schoolName: item.schoolName, schoolImageName: item.schoolImageName }))
    });

    const movieLot = movieData ?? [];

    return (
        <div>
            <S.CategoryParkingWrap>
                <S.CategoryTitleWrap><p>현재 주차 가능한 학교</p></S.CategoryTitleWrap>
            </S.CategoryParkingWrap>

            <S.CategoryMiddleWrap>
                <S.CategoryImageWrap>
                    {parkingLot.length === 0 ? (
                        <p>로딩중...</p>
                    ) : (
                        parkingLot.map(data => {
                            const imgName = data?.schoolImageName ?? '';
                            const imgSrc = `http://localhost:10000/images/${encodeURIComponent(imgName)}`;
                            return (
                                <S.CategoryImages to={`/reserve/parking/${data.id}`} key={data.id}>
                                    <img src={imgSrc} alt={data.schoolName || '학교 이미지'} />
                                    <S.CategoryImageTitle>{data.schoolName}</S.CategoryImageTitle>
                                    <S.CategoryImageDate>{dateRange}</S.CategoryImageDate>
                                    <S.CategoryImagePrice>₩ 20,000</S.CategoryImagePrice>
                                </S.CategoryImages>
                            )
                        })
                    )}
                </S.CategoryImageWrap>
            </S.CategoryMiddleWrap>

            <S.CategoryPlaceWrap>
                <S.CategoryTitleWrap><p>현재 장소대여 가능한 학교</p></S.CategoryTitleWrap>
            </S.CategoryPlaceWrap>

            <S.CategoryMiddleWrap>
                <S.CategoryImageWrap>
                    {placeLot.length === 0 ? (
                        <p>로딩중...</p>
                    ) : (
                        placeLot.map(data => {
                            const imgName = data?.schoolImageName ?? '';
                            const imgSrc = `http://localhost:10000/images/${encodeURIComponent(imgName)}`;
                            return (
                                <S.CategoryImages to={`/reserve/place/${data.id}`} key={data.id}>
                                    <img src={imgSrc} alt={data.schoolName || '학교 이미지'} />
                                    <S.CategoryImageTitle>{data.schoolName}</S.CategoryImageTitle>
                                    <S.CategoryImageDate>{dateRange}</S.CategoryImageDate>
                                    <S.CategoryImagePrice>₩ 100,000</S.CategoryImagePrice>
                                </S.CategoryImages>
                            )
                        })
                    )}
                </S.CategoryImageWrap>
            </S.CategoryMiddleWrap>

            <S.CategoryPlaceWrap>
                <S.CategoryTitleWrap><p>무료 자동차 극장 예약 가능 학교</p></S.CategoryTitleWrap>
            </S.CategoryPlaceWrap>

            <S.CategoryMiddleWrap>
                <S.CategoryImageWrap>
                    {movieLot.length === 0 ? (
                        <p>로딩중...</p>
                    ) : (
                        movieLot.map(data => {
                            const imgName = data?.schoolImageName ?? '';
                            const imgSrc = `http://localhost:10000/images/${encodeURIComponent(imgName)}`;
                            return (
                                <S.CategoryImages to={`/movie`} key={data.id}>
                                    <img src={imgSrc} alt={data.schoolName || '학교 이미지'} />
                                    <S.CategoryImageTitle>{data.schoolName}</S.CategoryImageTitle>
                                    <S.CategoryImageDate>{dateRange}</S.CategoryImageDate>
                                    <S.CategoryImagePrice>무료</S.CategoryImagePrice>
                                </S.CategoryImages>
                            )
                        })
                    )}
                </S.CategoryImageWrap>
            </S.CategoryMiddleWrap>
        </div >
    );
};

export default MainCategorySide;