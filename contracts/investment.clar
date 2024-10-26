(define-data-var total-invested uint 0)
(define-map investors {account: principal} {amount: uint})
(define-map proposals {id: uint} {description: (string-ascii 256), votes: uint})
(define-data-var next-proposal-id uint 0)

(define-constant min-investment 100)

(define-public (invest (amount uint))
    (begin
        (asserts! (>= amount min-investment) (err u100))
        (map-set investors {account: tx-sender} {amount: amount})
        (var-set total-invested (+ (var-get total-invested) amount))
        (ok amount)
    )
)

(define-public (propose (description (string-ascii 256)))
    (let ((id (var-get next-proposal-id)))
        (map-set proposals {id: id} {description: description, votes: u0})
        (var-set next-proposal-id (+ id u1))
        (ok id)
    )
)

(define-public (vote (proposal-id uint))
    (let ((proposal (map-get? proposals {id: proposal-id})))
        (match proposal
            proposal-data
            (begin
                (map-set proposals {id: proposal-id} {description: (get description proposal-data), votes: (+ (get votes proposal-data) u1)})
                (ok proposal-id)
            )
            (err u101)
        )
    )
)
