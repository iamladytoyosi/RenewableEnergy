(define-data-var profit-pool uint 0)

(define-public (deposit-profit (amount uint))
    (begin
        (var-set profit-pool (+ (var-get profit-pool) amount))
        (ok amount)
    )
)

(define-public (distribute-profit)
    (let ((total-invested (var-get total-invested)))
        (if (is-eq total-invested u0)
            (err u102) ; No investments to distribute
            (begin
                (map-map investors (lambda (investor {account: principal, amount: uint})
                    (let ((share (/ (* (var-get profit-pool) amount) total-invested)))
                        (stx-transfer? share tx-sender account)
                    )
                ))
                (var-set profit-pool u0)
                (ok "Profit distributed")
            )
        )
    )
)
