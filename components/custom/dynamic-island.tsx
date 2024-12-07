"use client"

import {
    Loader,
    Mail,
    MessageCircle,
    User,
    Waves
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DynamicContainer,
    DynamicDescription,
    DynamicDiv,
    DynamicIsland,
    DynamicTitle,
    useDynamicIslandSize
} from "@/components/ui/dynamic"

export const DynamicAction = () => {
    const { state: blobState, setSize } = useDynamicIslandSize()

    const renderCompactState = () => (
        <DynamicContainer className="flex items-center justify-center h-full w-full">
            <div className="relative w-full flex items-center">
                <DynamicDescription className="absolute left-4  my-auto text-lg font-medium tracking-tighter text-white ">
                    <MessageCircle className=" h-5 w-5 fill-cyan-400 text-cyan-400" />
                </DynamicDescription>

                <DynamicDescription className="absolute text-white right-4  my-auto text-lg font-bold tracking-tighter ">
                    newcult.co
                </DynamicDescription>
            </div>
        </DynamicContainer>
    )

    const renderLargeState = () => (
        <DynamicContainer className="flex items-center justify-center h-full w-full">
            <div className="relative  flex w-full items-center justify-between gap-6 px-4">
                <Loader className="animate-spin h-12 w-12  text-yellow-300" />

                <DynamicTitle className="my-auto text-2xl font-black tracking-tighter text-white ">
                    loading
                </DynamicTitle>
            </div>
        </DynamicContainer>
    )

    const renderTallState = () => (
        <DynamicContainer className="  flex flex-col mt-6 w-full items-start  gap-1 px-8 font-semibold">
            <DynamicDescription className="bg-cyan-300 rounded-2xl tracking-tight leading-5  p-2">
                The Cult of Pythagoras
            </DynamicDescription>
            <DynamicDescription className="bg-cyan-300 rounded-2xl tracking-tight leading-5  p-2 text-left">
                Music of the Spheres, an idea that celestial bodies produce a form of
                music through their movements
            </DynamicDescription>

            <DynamicTitle className=" text-4xl font-black tracking-tighter text-cyan-100 ">
                any cool cults?
            </DynamicTitle>
        </DynamicContainer>
    )

    const renderLongState = () => (
        <DynamicContainer className="flex items-center justify-center h-full w-full">
            <DynamicDiv className="relative  flex w-full items-center justify-between gap-6 px-4">
                <div>
                    <Waves className=" text-cyan-400 h-8 w-8" />
                </div>

                <DynamicTitle className="my-auto text-xl font-black tracking-tighter text-white ">
                    Supercalifragilisticexpialid
                </DynamicTitle>
            </DynamicDiv>
        </DynamicContainer>
    )

    const renderMediumState = () => (
        <DynamicContainer className="flex flex-col justify-between px-2 pt-4 text-left text-white h-full">
            <DynamicTitle className="text-2xl pl-3 font-black tracking-tighter">
                Reincarnation, welcome back
            </DynamicTitle>
            <DynamicDescription className="leading-5 text-neutral-500 pl-3">
                Good for small tasks or call outs
            </DynamicDescription>

            <DynamicDiv className="flex flex-col mt-auto space-y-1 mb-2 bg-neutral-700 p-2 rounded-b-2xl">
                <Button>
                    <Mail className="mr-2 h-4 w-4 fill-cyan-400 text-neutral-900" /> Login
                    with email
                </Button>

                <Button className="mt-1 ">
                    <User className="mr-2 h-4 w-4 fill-cyan-400 text-cyan-400" /> Join the
                    cult now
                </Button>
            </DynamicDiv>
        </DynamicContainer>
    )

    function renderState() {
        switch (blobState.size) {
            case "compact":
                return renderCompactState()
            case "large":
                return renderLargeState()
            case "tall":
                return renderTallState()
            case "medium":
                return renderMediumState()
            case "long":
                return renderLongState()
            default:
                return null
        }
    }

    return (
        <div className="flex flex-col gap-4 h-full">
            <DynamicIsland id="dynamic-blob">{renderState()}</DynamicIsland>
        </div>
    )
}