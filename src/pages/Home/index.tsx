import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { createContext, useState } from "react";

import {
    HomeContainer,
    StartCountdownButton,
    StopCountdownButton,
}
    from "./styles";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/Countdown";

/* interface NewCycleFormData {
    task: string
    minutesAmount: number
} */

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
    amountSecondsPassed: number,
    markCurrentCycleAsFinished: () => void,
    setSecondsPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(5, "Por favor, insira um nome para a tarefa"),
    minutesAmount: zod.number()
        .min(5, "O tempo mínimo é de 5 minutos")
        .max(60, "O tempo máximo é de 60 minutos")
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {

    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: "",
            minutesAmount: 0
        }
    })

    const { handleSubmit, reset, watch } = newCycleForm

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

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

    const task = watch("task")
    const isSubmitDisabled = !task

    function handleCreateNewCycle(data: NewCycleFormData) {

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
    }

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

            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">

                <CyclesContext.Provider value={{
                    activeCycle,
                    activeCycleId,
                    markCurrentCycleAsFinished,
                    amountSecondsPassed,
                    setSecondsPassed
                }}>
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm />
                    </FormProvider>
                    <CountDown />
                </CyclesContext.Provider>

                {activeCycle ? (
                    <StopCountdownButton onClick={handleInterruptCycle} type="button" >
                        <HandPalm size={24} />
                        Interromper
                    </StopCountdownButton>
                ) : (
                    <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                        <Play size={24} />
                        Começar
                    </StartCountdownButton>
                )

                }
            </form>
        </HomeContainer>
    )
}