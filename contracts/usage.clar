(define-map energy-usage {account: principal} {units: uint})

(define-public (record-usage (account principal) (units uint))
    (begin
        (map-set energy-usage {account: account} {units: units})
        (ok units)
    )
)

(define-read-only (get-usage (account principal))
    (map-get? energy-usage {account: account})
)

(define-public (distribute-energy-units)
    (let ((total-units (reduce + (map-get-all energy-usage 'units))))
        (if (is-eq total-units u0)
            (err u103) ; No usage data
            (begin
                (map-map energy-usage (lambda (usage {account: principal, units: uint})
                    (let ((share (/ (* units 100) total-units)))
                        (ok (stx-transfer? share tx-sender account))
                    )
                ))
                (ok "Units distributed")
            )
        )
    )
)
