"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Building, Plus, Trash2, ArrowLeft } from "lucide-react";
// import { AccountSidebar } from "@/components/account/AccountSidebar";
import AccountSidebar from "@/components/account/AccountSidebar";
import { Modal } from "@/components/account/Modals/Modal";
import { FormInput } from "@/components/account/Forms/FormInput";

interface BankAccount {
  id: string;
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  isPrimary: boolean;
}

const BankAccountPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [accounts, setAccounts] = useState<BankAccount[]>([
    {
      id: "1",
      bankName: "State Bank of India",
      accountHolderName: "John Doe",
      accountNumber: "XXXXXX1234",
      ifscCode: "SBIN0002499",
      isPrimary: true,
    },
  ]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteAccountId, setDeleteAccountId] = useState<string | null>(null);

  const [newAccount, setNewAccount] = useState({
    bankName: "",
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please Login to Manage Bank Accounts
          </h2>
          <a
            href="/login"
            className="text-orange-600 font-medium hover:underline"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  const handleAddAccount = () => {
    const account: BankAccount = {
      id: Date.now().toString(),
      ...newAccount,
      isPrimary: accounts.length === 0,
    };
    
    setAccounts([...accounts, account]);
    setNewAccount({
      bankName: "",
      accountHolderName: "",
      accountNumber: "",
      ifscCode: "",
    });
    setIsAddModalOpen(false);
  };

  const handleDeleteAccount = (id: string) => {
    setAccounts(accounts.filter((acc) => acc.id !== id));
    setDeleteAccountId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-bold text-gray-900">Bank Accounts</h1>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Account</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <AccountSidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="space-y-6">
              {accounts.map((account) => (
                <div
                  key={account.id}
                  className={`bg-white rounded-2xl shadow-sm p-6 border-2 ${
                    account.isPrimary
                      ? "border-orange-500"
                      : "border-gray-200 hover:border-gray-300"
                  } transition-colors`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                          <Building className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            {account.bankName}
                          </h3>
                          <p className="text-gray-600">
                            {account.accountHolderName}
                          </p>
                        </div>
                        {account.isPrimary && (
                          <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm font-medium rounded-full">
                            Primary
                          </span>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Account Number</p>
                          <p className="font-medium text-gray-900">
                            {account.accountNumber}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">IFSC Code</p>
                          <p className="font-medium text-gray-900">
                            {account.ifscCode}
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setDeleteAccountId(account.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}

              {accounts.length === 0 && (
                <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No Bank Accounts Added
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Add your bank account to enable withdrawals and payments.
                  </p>
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Add Bank Account
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Account Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Bank Account"
      >
        <div className="space-y-4">
          <FormInput
            label="Bank Name"
            value={newAccount.bankName}
            onChange={(value) =>
              setNewAccount({ ...newAccount, bankName: value })
            }
            placeholder="Enter bank name"
            required
          />
          
          <FormInput
            label="Account Holder Name"
            value={newAccount.accountHolderName}
            onChange={(value) =>
              setNewAccount({ ...newAccount, accountHolderName: value })
            }
            placeholder="Enter account holder name"
            required
          />
          
          <FormInput
            label="Account Number"
            value={newAccount.accountNumber}
            onChange={(value) =>
              setNewAccount({ ...newAccount, accountNumber: value })
            }
            placeholder="Enter account number"
            required
          />
          
          <FormInput
            label="IFSC Code"
            value={newAccount.ifscCode}
            onChange={(value) =>
              setNewAccount({ ...newAccount, ifscCode: value })
            }
            placeholder="Enter IFSC code"
            required
          />
          
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddAccount}
              className="flex-1 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
            >
              Add Account
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteAccountId !== null}
        onClose={() => setDeleteAccountId(null)}
        title="Remove Bank Account"
      >
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Are you sure you want to remove this bank account? This action cannot
            be undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setDeleteAccountId(null)}
              className="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() =>
                deleteAccountId && handleDeleteAccount(deleteAccountId)
              }
              className="flex-1 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors"
            >
              Remove Account
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BankAccountPage;