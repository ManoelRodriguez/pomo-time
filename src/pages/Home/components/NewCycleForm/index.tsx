import { FormContainer, MinutesAmountInput, TaksInput } from "./styles";

export function NewCycleForm() {
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
                min={1}
                max={60}
                {...register("minutesAmount", { valueAsNumber: true })}

            />

            <span>minutos.</span>
        </ FormContainer>
    )
}