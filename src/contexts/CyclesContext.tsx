import { createContext, useEffect, useReducer, useState } from "react"
// biome-ignore lint/style/useImportType: <explanation>
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer"
import {
    addNewCycleAction,
    interruptCurrentCycleAction,
    markCurrentCycleAsFinishedAction
} from "../reducers/cycles/actions"
import { differenceInSeconds } from "date-fns"

interface CreateCycleData {
    task: string,
    minutesAmount: number
}

interface CyclesContextType {
    cycles: Cycle[],
    activeCycle: Cycle | undefined,
    activeCycleId: string | null,
    amountSecondsPassed: number,
    markCurrentCycleAsFinished: () => void,
    setSecondsPassed: (seconds: number) => void,
    createNewCycle: (data: CreateCycleData) => void,
    interruptCurrentCycle: () => void
}

interface CyclesContextProviderProps {
    children: React.ReactNode
}

export const CyclesContext = createContext({} as CyclesContextType)



export function CyclesContextProvider({ children }: CyclesContextProviderProps) {

    const [cyclesState, dispatch] = useReducer(cyclesReducer, {
        cycles: [],
        activeCycleId: null
    }, (initialState) => {
        const storedStateAsJson = localStorage.getItem('@pomo-time:cycles-state-1.0.0')

        if (storedStateAsJson) {
            return JSON.parse(storedStateAsJson)
        }
        return initialState
    })

    const { cycles, activeCycleId } = cyclesState

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {

        if (activeCycle) {
            return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
        }

        return 0
    })

    useEffect(() => {
        const stateJson = JSON.stringify(cyclesState)
        localStorage.setItem('@pomo-time:cycles-state-1.0.0', stateJson)
    }, [cyclesState])



    function markCurrentCycleAsFinished() {

        dispatch(markCurrentCycleAsFinishedAction())
    }

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function createNewCycle(data: CreateCycleData) {

        const id = String(new Date().getTime())

        const newCycle: Cycle = {
            id,  // Gera um id único -  transforma o timestamp em milessegundos em string
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
            interruptedDate: null,
            finishedDate: null
        }

        dispatch(addNewCycleAction(newCycle))

        setAmountSecondsPassed(0)
    }

    function interruptCurrentCycle() {

        dispatch(interruptCurrentCycleAction())
        document.title = "Pomo Time"
    }

    return (
        <CyclesContext.Provider value={{
            cycles,
            activeCycle,
            activeCycleId,
            amountSecondsPassed,
            markCurrentCycleAsFinished,
            setSecondsPassed,
            createNewCycle,
            interruptCurrentCycle
        }}>
            {children}
        </CyclesContext.Provider>
    )
}

