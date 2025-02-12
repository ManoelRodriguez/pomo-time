import { useForm } from "react-hook-form";
import { FormContainer, MinutesAmountInput, TaksInput } from "./styles";
import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, "Por favor, insira um nome para a tarefa"),
    minutesAmount: zod.number()
        .min(1, "O tempo mínimo é de 5 minutos")
        .max(60, "O tempo máximo é de 60 minutos")
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function NewCycleForm() {

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: "",
            minutesAmount: 0
        }
    })

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