import FormInput, {
  formInputClass,
} from '@/app/add-people/_components/FormInput';
import InputGroup from '@/app/add-people/_components/InputGroup';
import RequiredTag from '@/app/add-people/_components/RequiredTag';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import {
  getAssistSocial,
  getPeople,
  updateAssistSocial,
  updatePeople,
  finalizeCheckout,
} from '@/config/drizzle-people';
import {
  people as peopleObject,
  assistSocial as assistSocialObject,
} from '../../../../drizzle/schema';

export default function EditPage({
  editIndex,
  setEditIndex,
}: {
  editIndex: number;
  setEditIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [assistSocial, setAssistSocial] =
    useState<typeof assistSocialObject.$inferSelect>();
  const [showCheckoutReason, setShowCheckoutReason] = useState(false);
  const [checkoutReason, setCheckoutReason] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [finalizeSuccess, setFinalizeSuccess] = useState(false);
  const [assistSocialSaveSuccess, setAssistSocialSaveSuccess] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<typeof peopleObject.$inferSelect>();

  const onSubmit = handleSubmit((data) => {
    updatePeople(editIndex, data)
      .then(() => {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      })
      .finally(() => {
        setEditIndex(-1);
      });
  });

  useEffect(() => {
    getPeople(editIndex).then((people) => {
      if (!people) return;
      setValue('name', people?.name);
      setValue('age', people?.age);
      setValue('birthDate', people?.birthDate);
      setValue('color', people?.color);
      setValue('gender', people?.gender);
      setValue('document', people?.document);
      setValue('addiction', people?.addiction);
      setValue('education', people?.education);
      setValue('deficiency', people?.deficiency);
      setValue('chronicDisease', people?.chronicDisease);
      setValue('admissionReason', people?.admissionReason);
      setValue('checkoutDate', people?.checkoutDate);
      setValue('checkoutReason', people?.checkoutReason);
    });

    getAssistSocial(editIndex).then((assistSocial) => {
      if (!assistSocial) return;
      setAssistSocial(assistSocial);
    });
  }, []);

  const handleFinalizeClick = () => {
    if (showCheckoutReason) {
      const currentDate = new Date().toISOString().split('T')[0];
      finalizeCheckout(editIndex, currentDate, checkoutReason)
        .then(() => {
          setFinalizeSuccess(true);
          setTimeout(() => setFinalizeSuccess(false), 3000);
          setEditIndex(-1);
        })
        .finally(() => {
          setShowCheckoutReason(false);
          setCheckoutReason('');
        });
    } else {
      setShowCheckoutReason(true);
    }
  };

  const handleSaveAssistSocial = () => {
    if (assistSocial) {
      updateAssistSocial(assistSocial.id, assistSocial.contentText ?? '')
        .then(() => {
          setAssistSocialSaveSuccess(true);
          setTimeout(() => setAssistSocialSaveSuccess(false), 3000);
        });
    }
  };

  return (
    <div className='flex flex-1 flex-col items-center gap-12 p-16'>
      {saveSuccess && (
        <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4' role='alert'>
          Ficha salva com sucesso!
        </div>
      )}
      {finalizeSuccess && (
        <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4' role='alert'>
          Ficha finalizada com sucesso!
        </div>
      )}
      {assistSocialSaveSuccess && (
        <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4' role='alert'>
          Anotação salva com sucesso!
        </div>
      )}
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
            <option value='M'>Masculino</option>
            <option value='F'>Feminino</option>
            <option value='O'>Outro</option>
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
          Salvar
        </button>
        <button
          type='button'
          className='border border-black bg-red-200 p-2 hover:bg-red-300'
          onClick={handleFinalizeClick}
        >
          Finalizar Ficha
        </button>
        {showCheckoutReason && (
          <InputGroup>
            <label>
              Razão da Saída
              <RequiredTag />
            </label>
            <FormInput
              value={checkoutReason}
              onChange={(e) => setCheckoutReason(e.target.value)}
              maxLength={255}
            />
            <button
              type='button'
              className='border border-black bg-purple-200 p-2 hover:bg-purple-300'
              onClick={handleFinalizeClick}
            >
              Confirmar Finalização
            </button>
          </InputGroup>
        )}
      </form>
      <div className='flex flex-col w-2/3 gap-2'>
        <textarea
          value={assistSocial?.contentText ?? ''}
          className='aspect-square w-3/3 p-4 text-black'
          onChange={(event) =>
            setAssistSocial((assistSocial) =>
              assistSocial
                ? { ...assistSocial, contentText: event.target.value }
                : undefined,
            )
          }
        />

        <button
          className='border border-black bg-purple-200 p-2 hover:bg-purple-300'
          onClick={handleSaveAssistSocial}
        >
          Salvar
        </button>
      </div>
    </div>
  );
}
