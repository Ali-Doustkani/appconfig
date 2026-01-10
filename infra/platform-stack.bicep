var acrname = 'alido${resourceGroup().name}acr'

resource acr 'Microsoft.ContainerRegistry/registries@2025-11-01' = {
  name: acrname
  location: resourceGroup().location
  sku: {
    name: 'Basic'
  }
}

output acrName string = acrname
