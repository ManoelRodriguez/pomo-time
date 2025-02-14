import { createContext, useState } from "react"

interface CreateCycleData {
    task: string,
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

    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

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
            interruptedDate: new Date(),
            finishedDate: new Date()
        }

        setCycles([...cycles, newCycle]) // (state) => [(...state + newCycle)]
        setActiveCycleId(id)
        setAmountSecondsPassed(0)
        /* reset() */
    }

    function interruptCurrentCycle() {
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