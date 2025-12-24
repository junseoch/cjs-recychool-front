import React, { useState } from 'react';
import S from './style';
import KakaoMap from '../map/KakaoMap';
import InfoCard from '../infocard/InfoCard';
import MainCategorySide from '../maincategoryside/MainCategorySide';
import ReservationCalendar from '../../reserve/components/ReservationCalendar';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import { h7Medium } from '../../../styles/common';

const MainBanner = () => {
    const [selected, setSelected] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleSelect = (payload) => {
        setSelected(prev => (prev?.id === payload?.id ? null : payload));
    }
    const today = new Date();
    const fullYear = today.getFullYear()
    return (
        <div>
            <S.BannerWrap>
                <S.ContentRow>
                    <S.MapPane>
                        <KakaoMap onSelect={handleSelect} selected={selected} />
                    </S.MapPane>

                    <S.SidePane>
                        <InfoCard selected={selected} />
                        <S.IsClosedSchoolWrap to={`/movie`}><p>무료 자동차 극장 예약하기</p></S.IsClosedSchoolWrap>
                    </S.SidePane>


                    <S.SearchWrap>
                        <S.FieldItem>
                            <div id='select-place'>
                                <label>지역</label>
                                <input type="text" placeholder="서울/경기도" />
                            </div>
                        </S.FieldItem>

                        <S.Divider />
                        <S.FieldItem>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ko'>
                                <label id='date-slt'>날짜선택</label>
                                <DatePicker
                                    value={selectedDate}
                                    inputFormat="YYYY-MM-DD"
                                    onChange={(newValue) => {
                                        setSelectedDate(newValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                        {...params}
                                        variant='standard'
                                        inputMode={{ shrink: true }}
                                        inputRef={{ disableUnderline: true }}
                                        
                                        />
                                    )}
                                    sx={{
                                        ".MuiPickersOutlinedInput-notchedOutline": { border: "none" },
                                        ".MuiPickersSectionList-root": { padding: '0px 32px' },
                                        ".MuiPickersInputBase-root": { padding: '0'},
                                        ".MuiInputAdornment-root": {margin: '0px 32px 15px 0px'},
                                        ".css-vycme6-MuiPickersInputBase-root-MuiPickersOutlinedInput-root.Mui-focused .MuiPickersOutlinedInput-notchedOutline": { border: "none"}
                                    }}
                                    />
                            </LocalizationProvider>
                        </S.FieldItem>

                        <S.SearchButton aria-label="검색" > <img src="/assets/images/schoolsearch.png" alt="검색버튼" /> </S.SearchButton>
                    </S.SearchWrap>
                </S.ContentRow>
            </S.BannerWrap>
            <MainCategorySide selected={selected} />
        </div>
    );
};

export default MainBanner;