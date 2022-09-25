import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '../../components/Form/Input'
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'

const createUserFormSchema = zod
  .object({
    name: zod.string().min(1, { message: 'Nome obrigatório' }),
    email: zod
      .string()
      .email({ message: 'E-mail inválido' })
      .min(1, { message: 'E-mail é obrigatório' }),
    password: zod.string().min(6, { message: 'No mínimo 6 caracteres' }),
    password_confirmation: zod.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'As senhas precisam ser iguais',
    path: ['password_confirmation'],
  })

type CreateUserFormInputs = zod.infer<typeof createUserFormSchema>

export default function CreateUser() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserFormInputs>({
    resolver: zodResolver(createUserFormSchema),
  })

  const handleCreateUser: SubmitHandler<CreateUserFormInputs> = (data) => {
    console.log(data)
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          onSubmit={handleSubmit(handleCreateUser)}
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={['6', '8']}
        >
          <Heading size="lg" fontWeight="normal">
            Criar usuário
          </Heading>
          <Divider marginY="6" borderColor="gray.700" />
          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input
                name="name"
                label="Nome completo"
                error={errors.name}
                {...register('name')}
              />
              <Input
                name="email"
                type="email"
                label="E-mail"
                error={errors.email}
                {...register('email')}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input
                name="password"
                type="password"
                label="Senha"
                error={errors.password}
                {...register('password')}
              />
              <Input
                name="password_confirmation"
                type="password"
                label="Confirmação da senha"
                error={errors.password_confirmation}
                {...register('password_confirmation')}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" isLoading={isSubmitting} colorScheme="pink">
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
