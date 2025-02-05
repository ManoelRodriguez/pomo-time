import { Play } from "phosphor-react";
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
    TaksInput
}
    from "./styles";


const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, "Por favor, insira um nome para a tarefa"),
    minutesAmount: zod.number()
        .min(5, "O tempo mínimo é de 5 minutos")
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
    startDate: Date
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
        if (activeCycle) {

            setInterval(() => {
                setAmountSecondsPassed(differenceInSeconds(new Date(), activeCycle.startDate))
            }, 1000)
        }
    }, [activeCycle])

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
        reset()
    }


    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <FormContainer>
                    <label htmlFor="">Vou trabalhar em</label>
                    <TaksInput
                        id="task"
                        list="task-sugestions"
                        placeholder="Dê um nome para o seu projeto"
                        {...register("task")}
                    />

                    <datalist id="task-sugestions">
                        <option value="Estudar ReactJs"></option>
                        <option value="Estudar NextJs"></option>
                        <option value="Estudar NodeJs"></option>
                    </datalist>

                    <label htmlFor="">durante</label>
                    <MinutesAmountInput
                        type="number"
                        id="minutesAmount"
                        placeholder="00"
                        step={5}
                        min={5}
                        max={60}
                        {...register("minutesAmount", { valueAsNumber: true })}

                    />

                    <span>minutos.</span>
                </ FormContainer>

                <CountdownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountdownContainer>

                <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24} />
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}