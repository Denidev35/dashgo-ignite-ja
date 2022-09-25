import { Button, Flex, Stack } from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '../components/Form/Input'

const signInFormSchema = zod.object({
  email: zod
    .string()
    .email({ message: 'E-mail inválido' })
    .min(1, { message: 'E-mail é obrigatório' }),
  password: zod.string().min(1, { message: 'Senha obrigatória' }),
})

type SignInFormInput = zod.infer<typeof signInFormSchema>

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignInFormInput>({
    resolver: zodResolver(signInFormSchema),
  })

  console.log(errors)

  const handleSignIn: SubmitHandler<SignInFormInput> = (data) => {
    console.log(data)
  }

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            type="email"
            name="email"
            label="E-mail"
            error={errors.email}
            {...register('email')}
          />
          <Input
            type="password"
            name="password"
            label="Senha"
            error={errors.password}
            {...register('password')}
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
          isLoading={isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
