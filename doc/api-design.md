## Diseño de la API

## Modelos de datos

### User

| Campo | Tipo | Validaciones | Notas |
|---|---|---|---|
| `name` | String | required | Nombre del usuario |
| `email` | String | required, unique | Para el login |
| `password` | String | required, minlength: 8 | Hasheada con bcrypt |
| `diabetesType` | String | enum: ['type1', 'type2', 'gestational'] | Tipo de diabetes del usuario |

### GlucoseRecord

| Campo | Tipo | Validaciones | Notas |
|---|---|---|---|
| `value` | Number | required, min: 20, max: 600 | Valor en mg/dL |
| `moment` | String | required, enum: ['ayunas', 'antes_comida', 'despues_comida', 'antes_dormir'] | Momento del día en que se toma la medición |
| `date` | Date | required, default: Date.now | Fecha y hora del control |
| `notes` | String | maxlength: 200 | Nota libre opcional |
| `user` | ObjectId | ref: 'User', required | Usuario al que pertenece el registro |

### Exercise (contenido fijo, sin relación con usuario)

| Campo | Tipo | Validaciones | Notas |
|---|---|---|---|
| `title` | String | required | Nombre del ejercicio |
| `type` | String | required, enum: ['running', 'pesas'] | Categoría |
| `description` | String | required | Explicación breve |
| `duration` | Number | required | Duración orientativa en minutos |
| `intensity` | String | enum: ['baja', 'media', 'alta'] | Intensidad orientativa |

### NutritionTip (contenido fijo, sin relación con usuario)

| Campo | Tipo | Validaciones | Notas |
|---|---|---|---|
| `title` | String | required | Título del consejo |
| `text` | String | required | Texto explicativo del consejo |
| `order` | Number | — | Orden de aparición en el listado |


`GlucoseRecord.user` se relaciona con `User` (un usuario tiene muchos registros de glucemia).
`Exercise` y `NutritionTip` no tienen relación con `User` de momento, si en el futuro me da tiempo, el usuario podra registrar exercise o nutrition, como el glucoseRecord. De momento es contenido fijo.

---

## Endpoints

### Auth

| POST | `/api/v0/register` | Registro de usuario | `{ name, email, password, diabetesType }` | `201` |
| POST | `/api/v0/login` | Login del usuario | `{ email, password }` | `200` |


Una vez logeado, puede acceder a todos estos campos: 

### Users

| GET | `/api/v0/users/me` | Pagina de detalle del usuario | — | `200` `{ user }` | Devuelve los datos del usuario autenticado |

### Glucose

| GET | `/api/v0/glucose` | `200` `[ record ]` | Lista los registros del usuario autenticado, ordenados por fecha |
| POST | `/api/v0/glucose` | `{ value, moment, date, notes }` | `201` | Crea un nuevo registro asociado al usuario autenticado |
| DELETE | `/api/v0/glucose/:id` | `204` | Elimina un registro (solo si pertenece al usuario autenticado) |

### Exercises

| GET | `/api/v0/exercises` | `200` `[ exercise ]` | Lista todos los ejercicios disponibles |

### Nutrition 

| GET | `/api/v0/nutrition-tips` | `200` `[ nutrition ]` | Lista todos los consejos disponibles |

