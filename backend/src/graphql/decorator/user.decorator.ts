import { createParameterDecorator, ResolverData } from 'type-graphql'
import { GraphqlContext } from '../context/index.js'
import { prismaClient } from '../../../prisma/prisma.js'
import { UserModel } from '../../models/user.model.js'

export const GqlUser = () => {
  return createParameterDecorator(
    async ({ context }: ResolverData<GraphqlContext>): Promise<UserModel | undefined> => {
      if (!context || !context.user) return undefined

      try {
        const user = await prismaClient.user.findUnique({
          where: {
            id: context.user,
          },
        })
        if (!user) throw new Error('Usuário não encontrado')
        return user
      } catch (error) {
        console.log('Error ao instanciar o gqluser')
      }
    }
  )
}