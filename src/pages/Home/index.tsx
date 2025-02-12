import { HandPalm, Play } from "phosphor-react";
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { createContext, useEffect, useState } from "react";
import { differenceInSeconds } from 'date-fns'

import {
    HomeContainer,
    StartCountdownButton,
    StopCountdownButton,
}
    from "./styles";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/Countdown";

interface NewCycleFormData {
    task: string
    minutesAmount: number
}

interface Cycle {
    id: string,
    task: string,
    minutesAmount: number,
    startDate: Date,
    interruptedDate: Date,
    finishedDate: Date
}

interface CyclesContextType {
    activeCycle: Cycle | undefined,
    activeCycleId: string | null,
    markCurrentCycleAsFinished: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

export function Home() {

    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

    function markCurrentCycleAsFinished() {
        setCycles((state) =>
            state.map(cycle => {
                if (cycle.id === activeCycleId) {
                    return { ...cycle, finishedDate: new Date() }
                } else {
                    return cycle
                }
            })
        )
    }

    /* const task = watch("task")
    const isSubmitDisabled = !task */

    /* function handleCreateNewCycle(data: NewCycleFormData) {

        const id = String(new Date().getTime())

        const newCycle: Cycle = {
            id,  // Gera um id único -  transforma o timestamp em milessegundos em string
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        setCycles([...cycles, newCycle]) // (state) => [(...state + newCycle)]
        setActiveCycleId(id)
        setAmountSecondsPassed(0)
        reset()
    } */

    function handleInterruptCycle() {
        setCycles((state) =>
            state.map(cycle => {
                if (cycle.id === activeCycleId) {
                    return { ...cycle, interruptedDate: new Date() }
                } else {
                    return cycle
                }
            })
        )
        document.title = "Pomo Time"
        setActiveCycleId(null)
    }


    return (
        <HomeContainer>

            <form /* onSubmit={handleSubmit(handleCreateNewCycle)} */ action="">

                <CyclesContext.Provider value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished }}>
                    {/* <NewCycleForm /> */}
                    <CountDown />
                </CyclesContext.Provider>

                {activeCycle ? (
                    <StopCountdownButton onClick={handleInterruptCycle} type="button" >
                        <HandPalm size={24} />
                        Interromper
                    </StopCountdownButton>
                ) : (
                    <StartCountdownButton /* disabled={isSubmitDisabled} */ type="submit">
                        <Play size={24} />
                        Começar
                    </StartCountdownButton>
                )

                }
            </form>
        </HomeContainer>
    )
}