import { HandPalm, Play } from "phosphor-react";
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useEffect, useState } from "react";
import { differenceInSeconds } from 'date-fns'

import {
    CountdownContainer,
    FormContainer,
    HomeContainer,
    MinutesAmountInput,
    Separator,
    StartCountdownButton,
    StopCountdownButton,
    TaksInput
}
    from "./styles";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/Countdown";


const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, "Por favor, insira um nome para a tarefa"),
    minutesAmount: zod.number()
        .min(1, "O tempo mínimo é de 5 minutos")
        .max(60, "O tempo máximo é de 60 minutos")
})

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

export function Home() {

    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: "",
            minutesAmount: 0
        }
    })

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, "0") // Adiciona um 0 a esquerda se o número tiver apenas 1 dígito
    const seconds = String(secondsAmount).padStart(2, "0") // Adiciona um 0 a esquerda se o número tiver apenas 1 dígito

    const task = watch("task")
    const isSubmitDisabled = !task

    useEffect(() => {
        let interval: number

        if (activeCycle) {
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate)

                if (secondsDifference >= totalSeconds) {
                    setCycles((state) =>
                        state.map(cycle => {
                            if (cycle.id === activeCycleId) {
                                return { ...cycle, finishedDate: new Date() }
                            } else {
                                return cycle
                            }
                        })
                    )
                    setAmountSecondsPassed(totalSeconds)
                    clearInterval(interval)
                } else {
                    setAmountSecondsPassed(secondsDifference)
                }
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [activeCycle, totalSeconds, activeCycleId])

    useEffect(() => {
        if (activeCycle) {
            document.title = `${minutes}:${seconds}`
        }
    }, [minutes, seconds, activeCycle])

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

                <NewCycleForm />
                <CountDown />

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