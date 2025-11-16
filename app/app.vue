<template>
    <div class="bg-gradient-to-bl from-[#DABCB2] to-[#ffffff]">
        <!-- 메인 헤더 -->
        <main-header />
        <!-- 리밸런싱 계산기 섹션 -->
        <div class="max-w-6xl mx-auto flex flex-col px-7 py-20">
            <div class="flex flex-col justify-start space-y-2">
                <p class="w-fit font-cafe24 text-4xl bg-gradient-to-tr from-[#AC8C8C] to-[#463939] bg-clip-text text-transparent">
                    리밸런싱 자동 계산기
                </p>
                <p>
                    이미지를 업로드하여 포트폴리오를 불러오세요
                </p>
            </div>
            <div class="flex-1 flex flex-row space-x-3">
                <!-- 이미지 넣기 -->
                <div class="h-[24rem] w-[28rem] flex flex-col mt-10 rounded-3xl border border-white shadow-[4px_-2px_32px_rgba(0,0,0,0.25)] p-5 space-y-2.5">
                    <div class="h-16 w-fit flex flex-row p-1.5 bg-[#5C5C5C]/40 rounded-full shadow-[inset_2px_-3px_4px_rgba(0,0,0,0.25)]">
                        <!-- 자동 선택 -->
                        <div class="flex items-center rounded-full bg-[#34312F] px-4 shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                            <div class="flex flex-row items-end space-x-1">
                                <p class="font-cafe24 text-xl text-white leading-none">
                                    자동
                                </p>
                                <p class="font-cafe24 text-xs text-[#A8A8A8] leading-none">
                                    AI 이미지 인식
                                </p>
                            </div>
                        </div>
                        <div class="flex items-center rounded-full px-4">
                            <div class="flex flex-row items-end space-x-1">
                                <p class="font-cafe24 text-xl text-[#343130] leading-none">
                                    수동
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- 이미지 인풋 -->
                    <div class="flex-1 flex flex-col rounded-3xl bg-[#5C5C5C]/40 shadow-[inset_2px_-3px_4px_rgba(0,0,0,0.25)] p-3 space-y-2">
                        <div class="flex flex-row items-end space-x-2">
                            <!-- 밸곰이 이미지 -->
                            <div class="h-12 w-12 rounded-full bg-white overflow-hidden">

                            </div>
                            <div class="w-fit flex flex-row rounded-bl-sm rounded-tl-2xl rounded-r-2xl bg-black/70 px-4 py-2 items-end space-x-16">
                                <div class="flex flex-col justify-start">
                                    <p class="text-[10px] text-[#A8A8A8] font-light">
                                        밸곰이
                                    </p>
                                    <p class="text-sm text-white font-normal">
                                        아래 이미지를 업로드해서<br>
                                        포트폴리오를 불러오자!
                                    </p>
                                </div>
                                <p class="text-[9px] text-[#A8A8A8] font-light">
                                    {{ time }}
                                </p>
                            </div>
                        </div>
                        <div class="flex-1 border-dashed border-1 rounded-3xl border-[#34312F] bg-[#AEA19D]">

                        </div>
                    </div>
                </div>
                <!-- 기초 정보 설정 -->
                <div class="h-[24rem] flex-1 flex flex-col mt-10 rounded-3xl border border-white shadow-[4px_-2px_32px_rgba(0,0,0,0.25)] p-5 space-y-2.5">
                    <div class="h-16 flex flex-col">
                        <p class="text-3xl font-semibold">
                            기초 정보 설정
                        </p>
                        <p class="text-xs font-normal text-[#5E5E5E]">
                            리밸런싱에 앞서 기준이 될 정보를 설정하세요.
                        </p>
                    </div>
                    <div class="flex-1 flex flex-col rounded-3xl bg-[#5C5C5C]/40 shadow-[inset_2px_-3px_4px_rgba(0,0,0,0.25)] p-3 space-y-3">
                        <!-- 원/달러 전환버튼, 환율표시 -->
                        <div class="flex flex-row items-end space-x-2">
                            <div class="flex flex-row w-20 h-10 rounded-xl bg-[#34302F] shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                                <div class="flex-1 h-full rounded-xl flex items-center justify-center bg-[#DABCB2] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                                    <p class="text-[#34302F] font-bold text-xl">
                                        원
                                    </p>
                                </div>
                                <div class="flex-1 h-full flex items-center justify-center">
                                    <p class="text-white font-bold text-xl">
                                        $
                                    </p>
                                </div>
                            </div>
                            <div class="h-full flex flex-col justify-center">
                                <p class="text-lg font-medium text-white">
                                    변환 기준환율 : 1$ ↔ 1460₩
                                </p>
                                <p class="text-xs text-white">
                                    업데이트 2025-11-16 13:00
                                </p>
                            </div>
                        </div>
                        <div class="flex flex-row items-center space-x-2">
                            <input
                                type="text"
                                placeholder="Please enter"
                                class="h-10 w-56 rounded-xl flex items-center justify-center bg-[#DABCB2] px-5
                                text-xl text-white placeholder:text-xl
                                shadow-[0_4px_4px_rgba(0,0,0,0.25)] focus:outline-none focus:ring-0 focus:border-none focus-visible:outline-none focus-visible:ring-0"
                            />
                            <p class="text-white text-xl font-semibold">
                                보유 현금 : 3,000,000 원
                            </p>
                        </div>
                        <div class="flex flex-col w-full">
                            <p class="text-lg font-semibold text-white">
                                종목 검색
                            </p>
                            <input
                                type="text"
                                placeholder="개별 종목을 검색하세요"
                                class="h-[40px] w-full rounded-xl flex items-center justify-center bg-[#DABCB2] px-5
                                text-xl text-white placeholder:text-xl
                                shadow-[0_4px_4px_rgba(0,0,0,0.25)] focus:outline-none focus:ring-0 focus:border-none focus-visible:outline-none focus-visible:ring-0"
                            />
                            <div class="mt-2">
                                <div class="flex flex-row space-x-1">
                                    <div class="py-1 px-3 rounded-full border border-[#DABCB2]">
                                        <p class="text-white text-xs">
                                            엔비디아
                                        </p>
                                    </div>
                                    <div class="py-1 px-3 rounded-full border border-[#DABCB2]">
                                        <p class="text-white text-xs">
                                            팔란티어
                                        </p>
                                    </div>
                                    <div class="py-1 px-3 rounded-full border border-[#DABCB2]">
                                        <p class="text-white text-xs">
                                            테슬라
                                        </p>
                                    </div>
                                    <div class="py-1 px-3 rounded-full border border-[#DABCB2]">
                                        <p class="text-white text-xs">
                                            마이크로소프트
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="min-h-[24rem] flex-1 flex flex-col mt-3 rounded-3xl border border-white shadow-[4px_-2px_32px_rgba(0,0,0,0.25)] p-5 space-y-2.5">

            </div>
        </div>
    </div>
</template>

<script setup>
import MainHeader from "~/layouts/main-header.vue";

import dayjs from 'dayjs'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const time = ref(dayjs().format('HH:mm'))

onMounted(() => {
    const timer = setInterval(() => {
        time.value = dayjs().format('HH:mm')
    }, 1000 * 30)

    onBeforeUnmount(() => clearInterval(timer))
})
</script>
