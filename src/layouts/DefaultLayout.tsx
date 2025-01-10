import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export function DefaultLayout() {
    return (
        <div>
            <Header />
            <Outlet /> {/* //Usado para posicionar o restante da página que não é "padrão" */}
        </div>
    )
}