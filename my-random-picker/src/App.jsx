import React, { useState } from "react";
import "pretendard/dist/web/variable/pretendardvariable.css";
import './index.css';
import logo from './assets/logo.png';

function getRandomItems(list, count, allowDuplicates) {
    if (allowDuplicates) {
        const result = [];
        for (let i = 0; i < count; i++) {
            const random = list[Math.floor(Math.random() * list.length)];
            result.push(random);
        }
        return result;
    } else {
        const shuffled = [...list].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
}

export default function RandomSelector() {
    const [inputText, setInputText] = useState("");
    const [selected, setSelected] = useState([]);
    const [allowDuplicates, setAllowDuplicates] = useState(false);
    const [count, setCount] = useState("3");

    const handleSelect = () => {
        const parsedCount = parseInt(count, 10);
        if (isNaN(parsedCount) || parsedCount < 1) {
            alert("1명 이상의 유효한 숫자를 입력해주세요.");
            return;
        }

        let ids = inputText
            .split(/[\n,]+/)
            .map((id) => id.trim())
            .filter((id) => id.length > 0);

        if (!allowDuplicates) {
            ids = Array.from(new Set(ids)); // 중복 제거
        }

        if (!allowDuplicates && ids.length < parsedCount) {
            alert(`중복 없이 ${parsedCount}명을 추출하려면 최소 ${parsedCount}개의 고유 ID가 필요합니다.`);
            return;
        }

        if (ids.length === 0) {
            alert("ID를 입력해주세요.");
            return;
        }

        setSelected(getRandomItems(ids, parsedCount, allowDuplicates));
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6" style={{ fontFamily: "Pretendard Variable, sans-serif" }}>
            <header className="w-40 h-40">
                <img src={logo} alt="Logo" className="h-full object-contain"/>
            </header>

            <div className="text-center w-full max-w-md">
            <h1 className="text-2xl font-semibold mb-6 text-[#33bb66] tracking-tight">랜덤 ID 추출기</h1>

                <textarea
                    placeholder="ID를 한 줄에 하나씩 입력하세요"
                    className="w-full h-44 p-4 bg-gray-50 border border-gray-200 rounded-2xl shadow-inner outline-none focus:ring-2 focus:ring-[#33bb66] text-sm placeholder-gray-400 transition"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />

                <div className="flex items-center justify-between my-4 text-sm text-gray-600">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="duplicates"
                            className="accent-[#33bb66] w-4 h-4 mr-2"
                            checked={allowDuplicates}
                            onChange={() => setAllowDuplicates(!allowDuplicates)}
                        />
                        <label htmlFor="duplicates" className="select-none">
                            중복 허용 (같은 사람이 여러 번 뽑힐 수 있음)
                        </label>
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="count" className="mr-2 text-gray-700">인원 수</label>
                        <input
                            type="text"
                            inputMode="numeric"
                            id="count"
                            value={count}
                            onChange={(e) => setCount(e.target.value.replace(/[^\d]/g, ""))}
                            className="w-16 px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#33bb66]"
                        />
                    </div>
                </div>

                <button
                    onClick={handleSelect}
                    className="w-full py-3 rounded-2xl bg-[#33bb66] text-white font-medium text-sm tracking-wide shadow-md hover:shadow-lg hover:brightness-105 transition"
                >
                    추첨하기
                </button>

                <ul className="mt-6 space-y-2 text-lg font-semibold text-gray-800">
                    {selected.map((id, index) => (
                        <li key={index} className="bg-gray-100 rounded-xl py-2">{id}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
