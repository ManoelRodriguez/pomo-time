import { ButtonContainer, ButtonVariant } from "./Button.styles"

interface ButtonProps {
    variant?: ButtonVariant
}

// Definindo que a cor padrão será a primary
export function Button({ variant = 'primary' }: ButtonProps) {
    return <ButtonContainer variant={variant}>Enviar</ButtonContainer>
}