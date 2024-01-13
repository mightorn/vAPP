import { w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { configureChains, createConfig } from 'wagmi'
import { goerli, mainnet, sepolia } from 'wagmi/chains'

export const walletConnectProjectId = '4ba795c7c35ac041a7adedc80bdb57d1'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, ...(process.env.NODE_ENV === 'development' ? [goerli,sepolia] : [])],
  [w3mProvider({ projectId: walletConnectProjectId })],
)

export const config = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({
    chains,
    projectId: walletConnectProjectId,
    version: 2,
  }),
  publicClient,
  webSocketPublicClient,
})

export { chains }
