'use client';

import { people } from '../../../drizzle/schema';
import { useForm } from 'react-hook-form';
import InputGroup from './_components/InputGroup';
import FormInput, { formInputClass } from './_components/FormInput';
import { addPeople } from '@/config/drizzle-people';
import RequiredTag from './_components/RequiredTag';

export default function AddPeoplePage() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<typeof people.$inferInsert>();

  const onSubmit = handleSubmit((data) => {
    addPeople(data)
      .then(() => {})
      .finally(() => {
        setValue('name', '');
        setValue('age', 0);
        setValue('birthDate', '');
        setValue('color', '');
        setValue('gender', '');
        setValue('document', '');
        setValue('addiction', '');
        setValue('education', '');
        setValue('deficiency', '');
        setValue('chronicDisease', '');
        setValue('admissionReason', '');
      });
  });

  return (
    <div className='flex flex-1 justify-center p-16'>
      <form
        onSubmit={onSubmit}
        className='flex h-full w-2/3 flex-col justify-between gap-2 rounded border border-black bg-white p-8'
      >
        <InputGroup>
          <label>
            Nome
            <RequiredTag />
          </label>
          <FormInput
            {...register('name', { required: true, maxLength: 255 })}
          />
        </InputGroup>
        <InputGroup>
          <label>Idade</label>
          <FormInput type='number' {...register('age', { min: 0 })} />
        </InputGroup>
        <InputGroup>
          <label>Data de Aniversario</label>
          <FormInput type='date' {...register('birthDate')} />
        </InputGroup>
        <InputGroup>
          <label>
            Cor
            <RequiredTag />
          </label>
          <select
            className={formInputClass}
            {...register('color', { required: true, maxLength: 255 })}
          >
            <option>Branca</option>
            <option>Parda</option>
            <option>Preta</option>
            <option>Amarela</option>
            <option>Vermelha</option>
            <option>Outro</option>
          </select>
        </InputGroup>
        <InputGroup>
          <label>
            Gênero
            <RequiredTag />
          </label>
          <select
            className={formInputClass}
            {...register('gender', { required: true, maxLength: 255 })}
          >
            <option>Masculino</option>
            <option>Feminino</option>
            <option>Outro</option>
          </select>
        </InputGroup>
        <InputGroup>
          <label>Documento</label>
          <FormInput {...register('document', { maxLength: 255 })} />
        </InputGroup>
        <InputGroup>
          <label>Vicio</label>
          <FormInput {...register('addiction', { maxLength: 255 })} />
        </InputGroup>
        <InputGroup>
          <label>
            Escolaridade
            <RequiredTag />
          </label>
          <select
            className={formInputClass}
            defaultValue={'Desconhecida'}
            {...register('education', { required: true, maxLength: 255 })}
          >
            <option value={'Desconhecida'}>Desconhecida</option>
            <option value={'Sem Ensino'}>Sem Ensino</option>
            <option value={'Ensino Fundamental I Incompleto'}>
              Ensino Fundamental I Incompleto
            </option>
            <option value={'Ensino Fundamental I'}>Ensino Fundamental I</option>
            <option value={'Ensino Fundamental II Incompleto'}>
              Ensino Fundamental II Incompleto
            </option>
            <option value={'Ensino Fundamental II'}>
              Ensino Fundamental II
            </option>
            <option value={'Ensino Médio Incompleto'}>
              Ensino Médio Incompleto
            </option>
            <option value={'Ensino Médio'}>Ensino Médio</option>
            <option value={'Ensino Superior Incompleto'}>
              Ensino Superior Incompleto
            </option>
            <option value={'Ensino Superior'}>Ensino Superior</option>
          </select>
        </InputGroup>
        <InputGroup>
          <label>Deficiência</label>
          <FormInput {...register('deficiency', { maxLength: 255 })} />
        </InputGroup>
        <InputGroup>
          <label>Doença Cronica</label>
          <FormInput {...register('chronicDisease', { maxLength: 255 })} />
        </InputGroup>
        <InputGroup>
          <label>
            Razão de Admissão
            <RequiredTag />
          </label>
          <FormInput
            {...register('admissionReason', { required: true, maxLength: 255 })}
          />
        </InputGroup>
        <button className='border border-black bg-purple-200 p-2 hover:bg-purple-300'>
          Adicionar
        </button>
      </form>
    </div>
  );
}
