import { TextInput } from '../common/TextInput'

interface ConfirmPasswordInputProps {
  value: string
  onChange: (value: string) => void
}

export function ConfirmPasswordInput({ value, onChange }: ConfirmPasswordInputProps) {
  return (
    <div className="pt-5">
      <TextInput
        id="confirm-password"
        name="confirm-password"
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Confirm Password"
        required
        className="rounded-md"
        label="Confirm Password"
      />
    </div>
  )
} 