'use client'

type ShippingResult = {
  responsible: string
  confidence: number
  probabilities: Record<string, number>
}

type PartialRefund = {
  refund_percentage: number
  refund_amount_DA: number
  notes: string[]
}

type MLDecision = {
  resolution: string
  confidence: number
  probabilities: Record<string, number>
  policy_override: string | null
  shipping: ShippingResult | null
  partial_refund: PartialRefund | null
}

type MLResult = {
  shop_id: string
  shop_name: string
  decision: MLDecision
  policy_applied: {
    return_window_days: number
    fraud_score_threshold: number
    partial_refund_enabled: boolean
  }
  input_summary: {
    product_category: string
    product_category_normalized: string
    price_da: number
    days_to_return: number
    fraud_score: number
    return_reason: string
  }
  predicted_at: string
}

type Props = {
  mlResult: MLResult
  formData: {
    wilaya: string
    returnReason: string
    quantity: number
    customerAge?: number
    customerGender?: string
    pastReturns?: number
    paymentMethod?: string
    shippingMethod?: string
    productName?: string
  }
}

const resolutionConfig: Record<string, { label: string; emoji: string; bg: string; border: string; text: string }> = {
  Refund:   { label: 'REMBOURSEMENT', emoji: '💰', bg: 'bg-green-50',  border: 'border-green-300', text: 'text-green-700' },
  Exchange: { label: 'ÉCHANGE',       emoji: '🔄', bg: 'bg-blue-50',   border: 'border-blue-300',  text: 'text-blue-700'  },
  Repair:   { label: 'RÉPARATION',    emoji: '🔧', bg: 'bg-orange-50', border: 'border-orange-300',text: 'text-orange-700'},
  Reject:   { label: 'REFUSÉ',        emoji: '❌', bg: 'bg-red-50',    border: 'border-red-300',   text: 'text-red-700'   },
}

const shippingConfig: Record<string, { label: string; emoji: string; color: string }> = {
  Seller: { label: 'VENDEUR', emoji: '🏪', color: 'text-purple-700' },
  Buyer:  { label: 'CLIENT',  emoji: '📦', color: 'text-blue-700'   },
  Shared: { label: 'PARTAGÉ', emoji: '🤝', color: 'text-gray-700'   },
}

const reasonLabels: Record<string, string> = {
  DEFECTUEUX:    'Produit défectueux',
  MAUVAIS_ARTICLE: 'Erreur de commande vendeur',
  CHANGEMENT_AVIS: "Changement d'avis",
  NON_CONFORME:  'Ne correspond pas à la description',
}

function ProbabilityBar({ label, value, maxValue }: { label: string; value: number; maxValue: number }) {
  const barWidth = Math.round((value / maxValue) * 100)
  return (
    <div className="flex items-center gap-2 mb-1.5">
      <span className="text-xs font-mono w-20 text-gray-600 shrink-0">{label}</span>
      <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-gray-700 rounded-full transition-all duration-500"
          style={{ width: barWidth + '%' }}
        />
      </div>
      <span className="text-xs font-bold text-gray-700 w-12 text-right shrink-0">{value.toFixed(1)}%</span>
    </div>
  )
}

export default function MLResultCard({ mlResult, formData }: Props) {
  const res = resolutionConfig[mlResult.decision.resolution] || resolutionConfig.Reject
  const ship = mlResult.decision.shipping
    ? (shippingConfig[mlResult.decision.shipping.responsible] || shippingConfig.Buyer)
    : null

  const probEntries = Object.entries(mlResult.decision.probabilities).sort((a, b) => b[1] - a[1])
  const maxProb = probEntries[0]?.[1] || 100

  const shipProbEntries = ship && mlResult.decision.shipping
    ? Object.entries(mlResult.decision.shipping.probabilities).sort((a, b) => b[1] - a[1])
    : []
  const maxShipProb = shipProbEntries[0]?.[1] || 100

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">

      {/* Header */}
      <div className="bg-gray-900 text-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Analyse intelligente</p>
            <p className="text-sm font-semibold">{mlResult.shop_name}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Délai politique</p>
            <p className="text-sm font-bold text-white">{mlResult.policy_applied.return_window_days} jours</p>
          </div>
        </div>
      </div>

      {/* Résumé de la demande */}
      <div className="border-b border-gray-100 px-6 py-4 bg-gray-50">
        <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-3">Résumé de la demande</p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Produit</span>
            <span className="font-medium text-gray-800">
              {mlResult.input_summary.product_category_normalized}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Prix</span>
            <span className="font-medium text-gray-800">
              {mlResult.input_summary.price_da.toFixed(0)} DA
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Quantité</span>
            <span className="font-medium text-gray-800">{formData.quantity}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Délai</span>
            <span className="font-medium text-gray-800">
              {mlResult.input_summary.days_to_return} j / {mlResult.policy_applied.return_window_days} autorisés
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Raison</span>
            <span className="font-medium text-gray-800 text-right max-w-[140px]">
              {mlResult.input_summary.return_reason}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Wilaya</span>
            <span className="font-medium text-gray-800">{formData.wilaya}</span>
          </div>
          {formData.customerAge && (
            <div className="flex justify-between">
              <span className="text-gray-500">Client</span>
              <span className="font-medium text-gray-800">
                {formData.customerGender === 'Female' ? 'Femme' : 'Homme'}, {formData.customerAge} ans
              </span>
            </div>
          )}
          {formData.pastReturns !== undefined && (
            <div className="flex justify-between">
              <span className="text-gray-500">Historique</span>
              <span className="font-medium text-gray-800">{formData.pastReturns} retour(s)</span>
            </div>
          )}
          {formData.paymentMethod && (
            <div className="flex justify-between">
              <span className="text-gray-500">Paiement</span>
              <span className="font-medium text-gray-800">{formData.paymentMethod}</span>
            </div>
          )}
          {formData.shippingMethod && (
            <div className="flex justify-between">
              <span className="text-gray-500">Livraison</span>
              <span className="font-medium text-gray-800">{formData.shippingMethod}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-500">Fraud Score</span>
            <span className={mlResult.input_summary.fraud_score > 50 ? 'font-bold text-red-600' : 'font-medium text-green-600'}>
              {mlResult.input_summary.fraud_score}
            </span>
          </div>
        </div>
      </div>

      {/* Décision résolution */}
      <div className={'px-6 py-5 border-b border-gray-100 ' + res.bg}>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">{res.emoji}</span>
          <div>
            <p className={'text-lg font-bold ' + res.text}>RÉSOLUTION : {res.label}</p>
            <p className="text-sm text-gray-500">Confiance : {mlResult.decision.confidence.toFixed(1)}%</p>
          </div>
        </div>

        <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-3">Probabilités</p>
        {probEntries.map(([label, value]) => (
          <ProbabilityBar key={label} label={label} value={value} maxValue={maxProb} />
        ))}

        {/* Remboursement partiel */}
        {mlResult.decision.partial_refund && (
          <div className="mt-4 bg-white/70 rounded-xl p-3 border border-green-200">
            <p className="text-xs font-semibold text-green-700 mb-1">💰 Remboursement partiel</p>
            <p className="text-xl font-bold text-green-700">
              {mlResult.decision.partial_refund.refund_amount_DA.toFixed(2)} DA
            </p>
            <p className="text-xs text-gray-500">
              ({mlResult.decision.partial_refund.refund_percentage}% du montant)
            </p>
            {mlResult.decision.partial_refund.notes.map((note, i) => (
              <p key={i} className="text-xs text-gray-500 mt-1">• {note}</p>
            ))}
          </div>
        )}
      </div>

      {/* Frais de retour */}
      {ship && mlResult.decision.shipping && (
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">{ship.emoji}</span>
            <div>
              <p className={'text-base font-bold ' + ship.color}>
                FRAIS RETOUR : {ship.label}
              </p>
              <p className="text-sm text-gray-500">
                Confiance : {mlResult.decision.shipping.confidence.toFixed(1)}%
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-3">Probabilités</p>
          {shipProbEntries.map(([label, value]) => (
            <ProbabilityBar key={label} label={label} value={value} maxValue={maxShipProb} />
          ))}
        </div>
      )}

      {/* Policy override */}
      {mlResult.decision.policy_override && (
        <div className="px-6 py-4 bg-yellow-50 border-b border-yellow-100">
          <p className="text-xs font-semibold text-yellow-700 mb-1">ℹ️ Note politique boutique</p>
          <p className="text-sm text-yellow-800">{mlResult.decision.policy_override}</p>
        </div>
      )}

      {/* Footer */}
      <div className="px-6 py-3 bg-gray-50 flex justify-between items-center">
        <p className="text-xs text-gray-400">
          Analysé le {new Date(mlResult.predicted_at).toLocaleString('fr-FR')}
        </p>
        <p className="text-xs text-gray-400">
          Seuil fraude : {mlResult.policy_applied.fraud_score_threshold}
        </p>
      </div>
    </div>
  )
}