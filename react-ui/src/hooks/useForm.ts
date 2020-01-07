import * as React from 'react';

type TFormValidation<TFormValues> = {
  [key in keyof TFormValues]?: string;
};

type ISanitizer = (params: HTMLInputElement | HTMLTextAreaElement) => boolean;
type IValidator<TValues> = (values: TValues) => TFormValidation<TValues>;
type IFormatter<TValues> = (value: TValues) => TValues;

interface IParams<TValues> {
  initialValues: TValues;
  sanitizer?: ISanitizer;
  validator?: IValidator<TValues>;
  immediateValidator?: IValidator<TValues>;
  formatter?: IFormatter<TValues>;
}

const checkIsValidationEmpty = (validation: TFormValidation<{}>): boolean => !Object.values(validation).some(message => typeof message === 'string');

const trimEmptyFields = <TValidation>(validation: TValidation): TValidation =>
  Object.entries(validation).reduce<any>((acc, [key, value]) => {
    if (value) {
      acc[key] = value;
    }
    return acc;
  }, {});

/**
 * Хук содержит переиспользуемую логику формы.
 * @param {IParams} param0
 * @property {object} param0.initialValue - изначальные значения формы
 * @property {ISanitizer} param0.sanitizer - функция, отвечающая за санитизацию изменений инпутов.
 * @property {IValidator} param0.validator - функция, отвечающая за ручную валидацию значений формы.
 * @property {IValidator} param0.immediateValidator - функция, отвечающая за валидацию значений формы сразу после изменения этих значений.
 */

export const useForm = <TValues>(params: IParams<TValues>) => {
  const {initialValues, sanitizer, validator, immediateValidator, formatter} = params;

  // Состояние хранит объект значений формы.
  const [values, setValues] = React.useState(initialValues);

  // Состояние хранит результат валидации значений формы.
  const [validation, setValidation] = React.useState<TFormValidation<TValues>>({});

  // Если initialValues задаются ассинхронно
  React.useEffect(() => {
    setValues(initialValues)
  }, [initialValues]);

  // Эффект следит за значениями формы и, при наличии
  // моментального валидатора, валидирует значения.
  React.useLayoutEffect(() => {
    if (immediateValidator) {
      setValidation(prevValue => ({
        ...prevValue,
        ...trimEmptyFields(immediateValidator(values))
      }));
    }
  }, [values, immediateValidator, initialValues]);

  // Хэндлер изменений инпута.
  // При наличии санитизатора проводит санитизацию
  // и в случае успеха вносит изменения в состояние значений формы.
  // Форматирует новые значения при наличии форматтера.
  const onChange = React.useCallback(
    (e: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      // При наличии функции-санитизатора производится санитизация
      // нового значения инпута.
      if (!sanitizer || sanitizer(e.currentTarget)) {
        const {name, value} = e.currentTarget;

        setValues(prevValues => {
          const nextValues = {
            ...prevValues,
            [name]: value
          };

          // При наличии функции для форматирования значений
          // производится форматирование новых значений.
          if (formatter) {
            return formatter(nextValues);
          }

          return nextValues;
        });

        // При каждом изменении инпута убирается валидационное сообщение
        // для соответствующего поля.
        setValidation(prevValues => {
          const nextValues = {
            ...prevValues,
            [name]: undefined
          };
          return trimEmptyFields(nextValues);
        });
      }
    },
    [sanitizer, setValues, formatter]
  );

  // Метод ручной валидации значений формы.
  // Может принимать в качестве аргумента функцию, которая
  // будет вызвана в случае успешной валидации значений.
  const validate = React.useCallback(
    (onValid?: () => void) => {
      setValidation(prevValidation => {
        // По-умолчанию следующее значение валидации соответствует
        // предыдущему, чтобы в случае отстутствия валидатора не
        // вызывать этим действием обновление компонента.
        let nextValidation = prevValidation;

        if (validator) {
          nextValidation = {
            ...trimEmptyFields(validator(values)),
          };
        }

        // Вызывается обработчик успешной валидации, если такой был передан.
        if (onValid && checkIsValidationEmpty(nextValidation)) {
          onValid();
        }
        return nextValidation;
      });
    }, [validator, values]
  );

  return {
    values,
    validation,
    validate,
    onChange,
  };
};
