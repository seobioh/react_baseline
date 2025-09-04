import React, { useEffect, useState } from 'react';
import { useUserStore } from '../../../stores/userStore';
import { useAccountStore } from '../../../stores/accountStore';
import './PointTransaction.css';

const PointTransaction: React.FC = () => {
    const [pointTransactions, setPointTransactions] = useState<any[]>([]);

    const { getPointTransactions } = useUserStore();
    const { token } = useAccountStore();
    
    useEffect(() => {
        loadPointTransactions();
    }, []);

    const loadPointTransactions = async () => {
        try {
            const data = await getPointTransactions();
            setPointTransactions(data);
        } catch (err: any) {
            alert('Error loading point transactions:' + err.message);
        }
    };


    if (!token) {
        return null;
    }

    return (
        <div className="point-transaction">
            <div className="point-transaction-container">
                <div className="point-transaction-space"></div>
                <h3>포인트 거래내역</h3>
                <div className="point-transaction-space"></div>
                {pointTransactions.length > 0 ? (
                    <>
                        <p>포인트 거래내역을 확인할 수 있습니다.</p>
                        <div className="point-transaction-space"></div>
                        <table>
                            <thead>
                                <tr>
                                    <th>거래일</th>
                                    <th>거래유형</th>
                                    <th>금액</th>
                                </tr>
                            </thead>
                            <div className="point-transaction-divider"></div>
                            <div className="point-transaction-space-small"></div>
                            <tbody>
                                {pointTransactions.map((transaction) => (
                                    <tr key={transaction.id}>
                                        <td>{new Date(transaction.created_at).toLocaleDateString('ko-KR')}</td>
                                        <td>{transaction.transaction_type}</td>
                                        <td>{transaction.amount > 0 ? `+${transaction.amount}` : transaction.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="point-transaction-space"></div>
                    </>
                ) : (
                    <>
                        <p>포인트 거래내역이 없습니다.</p>
                        <div className="point-transaction-space"></div>
                    </>
                )}
            </div>
        </div>
    )
}

export default PointTransaction;