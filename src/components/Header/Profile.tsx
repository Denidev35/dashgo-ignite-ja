import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

interface ProfileProps {
  showProfileData?: boolean
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Denilson Silva</Text>
          <Text color="gray.300" fontSize="small">
            denilson20@hotmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Denilson Silva"
        src="https://github.com/denidev35.png"
      />
    </Flex>
  )
}
