// server/services/whatsapp/processor.ts

export async function processWhatsAppMessage(payload: any) {
  // Por enquanto, apenas retorna sucesso
  // Vamos implementar a lógica completa depois
  console.log('WhatsApp webhook recebido:', payload)
  
  return {
    processed: true,
    message: 'Webhook recebido com sucesso'
  }
}