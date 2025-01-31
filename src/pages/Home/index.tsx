import { Play } from "phosphor-react";
import { useForm } from "react-hook-form"

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

export function Home() {

    const { register, handleSubmit, watch } = useForm()

    const task = watch("task")
    const isSubmitDisabled = !task

    function handleCreateNewCycle(data: any) {
        console.log(data)
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