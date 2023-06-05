import { useState } from 'react'
import { Button } from '@/components/Button'
import { Form } from '@/components/Form'
import { FormBox } from '@/components/FormBox'
import cx from 'clsx'

const QUANTIY_TEAMS_CHAMPIONSHIP = [
  {
    id: 'six_teams',
    value: 6,
  },
  {
    id: 'eight_teams',
    value: 8,
  },
  {
    id: 'ten_teams',
    value: 10,
  },
  {
    id: 'twelve_teams',
    value: 12,
  },
  {
    id: 'fourteen_teams',
    value: 14,
  },
  {
    id: 'sixteen_teams',
    value: 16,
  },
]

type QuantitySelected = {
  id: string
  value: number
  isChecked: boolean
}

export default function CreateChampionship() {
  const [quantityTeamsSelected, setQuantityTeamsSelected] =
    useState<QuantitySelected | null>(null)

  function handleSelectQuantityTeams({
    id,
    value,
    isChecked,
  }: QuantitySelected) {
    setQuantityTeamsSelected({
      id,
      value,
      isChecked,
    })
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-full p-6 sm:max-w-xl sm:p-0">
        <FormBox>
          <Form.Field>
            <Form.Label htmlFor="championship_name">
              Nome do campeonato
            </Form.Label>

            <Form.Input id="championship_name" placeholder="Premier League" />
          </Form.Field>

          <Form.Field>
            <Form.Label>Times no campeonato</Form.Label>

            <div className="flex items-center gap-4">
              {QUANTIY_TEAMS_CHAMPIONSHIP.map(({ value, id }) => {
                return (
                  <div
                    key={value}
                    className={cx(
                      'w-14 py-2 relative cursor-pointer rounded-md flex items-center justify-center gap-2 border transition-colors',
                      {
                        'border-[#323238]': quantityTeamsSelected?.id !== id,
                        'border-[#00875F]': quantityTeamsSelected?.id === id,
                      },
                    )}
                  >
                    <Form.InputRadio
                      id={id}
                      checked={quantityTeamsSelected?.id === id}
                      name="amount_teams"
                      className="invisible absolute top-0 left-0 w-full h-full"
                      onChange={(e) =>
                        handleSelectQuantityTeams({
                          id,
                          value,
                          isChecked: e.target.checked,
                        })
                      }
                    />

                    <Form.Label htmlFor={id}>{value}</Form.Label>
                  </div>
                )
              })}
            </div>
          </Form.Field>

          <Button className="w-full mt-4" disabled>
            Salvar
          </Button>
        </FormBox>
      </div>
    </div>
  )
}
