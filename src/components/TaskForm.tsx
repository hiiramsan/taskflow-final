import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

interface TaskFormProps {
  title: string
  setTitle: (value: string) => void
  description: string
  setDescription: (value: string) => void
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
  setPriority: (value: 'LOW' | 'MEDIUM' | 'HIGH') => void
  assignedId: string
  setAssignedId: (value: string) => void
  dueDate: string
  setDueDate: (value: string) => void
  submitting: boolean
  error: string | null
  valid: boolean
  handleSubmit: (e: React.FormEvent) => void
}

export function TaskForm({
  title,
  setTitle,
  description,
  setDescription,
  priority,
  setPriority,
  assignedId,
  setAssignedId,
  dueDate,
  setDueDate,
  submitting,
  error,
  valid,
  handleSubmit,
}: TaskFormProps) {
  return (
    <Stack spacing={2} component="form" onSubmit={handleSubmit}>
      <Typography variant="h6">Nueva tarea</Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        multiline
        rows={2}
      />
      <TextField
        select
        label="Prioridad"
        value={priority}
        onChange={(e) => setPriority(e.target.value as 'LOW' | 'MEDIUM' | 'HIGH')}
        fullWidth
        slotProps={{ select: { native: true } }}
      >
        <option value="LOW">Baja</option>
        <option value="MEDIUM">Media</option>
        <option value="HIGH">Alta</option>
      </TextField>
      <TextField
        label="ID del asignado"
        type="number"
        value={assignedId}
        onChange={(e) => setAssignedId(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Fecha límite"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
        fullWidth
        slotProps={{ inputLabel: { shrink: true } }}
      />
      <Button type="submit" variant="contained" disabled={!valid || submitting}>
        {submitting ? 'Creando...' : 'Crear tarea'}
      </Button>
    </Stack>
  )
}