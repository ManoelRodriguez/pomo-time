import { FormContainer, MinutesAmountInput, TaksInput } from "./styles";
import { useContext } from "react";
import { CyclesContext } from "../..";
import { useFormContext } from "react-hook-form";

export function NewCycleForm() {

    const { activeCycle } = useContext(CyclesContext)
    const { register } = useFormContext()

    return (
        <FormContainer>
            <label htmlFor="">Vou trabalhar em</label>
            <TaksInput
                id="task"
                list="task-sugestions"
                placeholder="Dê um nome para o seu projeto"
                disabled={!!activeCycle} // Se activeCycle for true, o input fica desabilitado
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
    )
}