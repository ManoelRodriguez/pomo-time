import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useContext } from "react";

import {
    HomeContainer,
    StartCountdownButton,
    StopCountdownButton,
}
    from "./styles";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/Countdown";
import { CyclesContext } from "../../contexts/CyclesContext";

/* interface NewCycleFormData {
    task: string
    minutesAmount: number
} */

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(5, "Por favor, insira um nome para a tarefa"),
    minutesAmount: zod.number()
        .min(5, "O tempo mínimo é de 5 minutos")
        .max(60, "O tempo máximo é de 60 minutos")
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {

    const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext)

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: "",
            minutesAmount: 0
        }
    })

    const { handleSubmit, watch, reset } = newCycleForm

    function handleCreateNewCycle(data: NewCycleFormData) {
        createNewCycle(data)
        reset()
    }

    const task = watch("task")
    const isSubmitDisabled = !task

    return (
        <HomeContainer>

            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">


                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <CountDown />

                {activeCycle ? (
                    <StopCountdownButton onClick={interruptCurrentCycle} type="button" >
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