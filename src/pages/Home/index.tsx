import { Play } from "phosphor-react";
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

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

export function Home() {

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: "",
            minutesAmount: 0
        }
    })

    const task = watch("task")
    const isSubmitDisabled = !task

    function handleCreateNewCycle(data: NewCycleFormData) {
        console.log(data)
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
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24} />
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}