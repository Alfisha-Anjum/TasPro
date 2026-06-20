"use client";

import { useEffect, useState } from "react";
import { Plus, Building2, Trash2, Check } from "lucide-react";
import { Modal } from "../Modals/Modal";
import { FormInput } from "../Forms/FormInput";
import { useToast } from "../../../hooks/use-toast";
import axios from "axios";

interface BankAccount {
  id: string;
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  isDefault: boolean;
}

interface BankAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BankAccountModal = ({
  isOpen,
  onClose,
}: BankAccountModalProps) => {
  const { toast } = useToast();
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<string | null>(null);
const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
const [fetchLoading, setFetchLoading] = useState(false);
  const [newAccount, setNewAccount] = useState({
    bankName: "",
    accountHolderName: "",
    accountNumber: "",
    confirmAccountNumber: "",
    ifscCode: "",
  });



const fetchBankAccounts = async () => {
  setFetchLoading(true);

  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "https://app.tasprocompany.in/api/customers/customer-bank-details",
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (res.data.status) {
      const formattedAccounts = res.data.data.map((item: any) => ({
        id: String(item.id),
        bankName: item.bank_name,
        accountHolderName: item.account_title,
        accountNumber: `****${String(item.account_number).slice(-4)}`,
        ifscCode: item.iban_number,
        isDefault: item.is_active === 1,
      }));

      setBankAccounts(formattedAccounts);
    }
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to fetch bank accounts.",
      variant: "destructive",
    });
  } finally {
    setFetchLoading(false);
  }
};

useEffect(() => {
  if (isOpen) {
    fetchBankAccounts();
  }
}, [isOpen]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!newAccount.bankName.trim()) {
      newErrors.bankName = "Bank name is required";
    }

    if (!newAccount.accountHolderName.trim()) {
      newErrors.accountHolderName = "Account holder name is required";
    }

    if (!newAccount.accountNumber.trim()) {
      newErrors.accountNumber = "Account number is required";
    } else if (newAccount.accountNumber.length < 9) {
      newErrors.accountNumber = "Please enter a valid account number";
    }

    if (!newAccount.confirmAccountNumber.trim()) {
      newErrors.confirmAccountNumber = "Please confirm account number";
    } else if (newAccount.accountNumber !== newAccount.confirmAccountNumber) {
      newErrors.confirmAccountNumber = "Account numbers do not match";
    }

   if (!newAccount.ifscCode.trim()) {
     newErrors.ifscCode = "IBAN number is required";
   }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleAddAccount = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "https://app.tasprocompany.in/api/customers/customer-bank-details",
        {
          bank_name: newAccount.bankName,
          account_title: newAccount.accountHolderName,
          account_number: newAccount.accountNumber,
          iban_number: newAccount.ifscCode, // your IFSC field mapped here
          is_active: 1,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.data.status) {
        toast({
          title: "Success",
          description: "Bank account added successfully!",
        });

        // 🔥 Refresh list from API
        await fetchBankAccounts();

        // reset form
        setNewAccount({
          bankName: "",
          accountHolderName: "",
          accountNumber: "",
          confirmAccountNumber: "",
          ifscCode: "",
        });

        setShowAddAccount(false);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error?.response?.data?.message || "Failed to add bank account",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = (id: string) => {
    setAccountToDelete(id);
    setShowConfirmDelete(true);
  };

  const confirmDelete = async () => {
    if (!accountToDelete) return;

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(
        `https://app.tasprocompany.in/api/customers/customer-bank-details/${accountToDelete}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.data.status) {
        toast({
          title: "Bank account removed",
          description: "The bank account has been deleted.",
        });

        await fetchBankAccounts();

        setShowConfirmDelete(false);
        setAccountToDelete(null);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error?.response?.data?.message || "Failed to delete bank account",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetDefault = (id: string) => {
    setBankAccounts((prev) =>
      prev.map((account) => ({
        ...account,
        isDefault: account.id === id,
      })),
    );

    toast({
      title: "Default account updated",
      description: "This account is now your default.",
    });
  };

  return (
    <>
      {/* Main Bank Account Modal */}
      <Modal isOpen={isOpen} onClose={onClose} title="Bank Accounts" size="md">
        <div className="space-y-6">
          {/* Add New Account Button */}

          {/* Bank Accounts List */}
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {bankAccounts.map((account) => (
              <div
                key={account.id}
                className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-orange-500" />
                    <h3 className="font-semibold text-gray-900">
                      {account.bankName}
                    </h3>
                    {account.isDefault && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSetDefault(account.id)}
                      className="p-2 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteAccount(account.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Account Holder:</span>{" "}
                    {account.accountHolderName}
                  </p>
                  <p>
                    <span className="font-medium">Account Number:</span>{" "}
                    {account.accountNumber}
                  </p>
                  <p>
                    <span className="font-medium">IFSC Code:</span>{" "}
                    {account.ifscCode}
                  </p>
                </div>
              </div>
            ))}

            {bankAccounts.length === 0 && (
              <div className="text-center py-12">
                <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No bank accounts added yet</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setShowAddAccount(true)}
            className="w-full h-11 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Bank Account
          </button>
        </div>
      </Modal>

      {/* Add New Account Modal */}
      <Modal
        isOpen={showAddAccount}
        onClose={() => setShowAddAccount(false)}
        title="Add Bank Account"
        size="md"
      >
        <div className="space-y-4">
          <FormInput
            label="Bank Name"
            value={newAccount.bankName}
            onChange={(value) =>
              setNewAccount((prev) => ({ ...prev, bankName: value }))
            }
            placeholder="Enter bank name"
            required
            error={errors.bankName}
          />

          <FormInput
            label="Account Holder Name"
            value={newAccount.accountHolderName}
            onChange={(value) =>
              setNewAccount((prev) => ({ ...prev, accountHolderName: value }))
            }
            placeholder="Enter account holder name"
            required
            error={errors.accountHolderName}
          />

          <FormInput
            label="Account Number"
            type="password"
            value={newAccount.accountNumber}
            onChange={(value) =>
              setNewAccount((prev) => ({ ...prev, accountNumber: value }))
            }
            placeholder="Enter account number"
            required
            error={errors.accountNumber}
          />

          <FormInput
            label="Confirm Account Number"
            type="password"
            value={newAccount.confirmAccountNumber}
            onChange={(value) =>
              setNewAccount((prev) => ({
                ...prev,
                confirmAccountNumber: value,
              }))
            }
            placeholder="Confirm account number"
            required
            error={errors.confirmAccountNumber}
          />

          <FormInput
            label="IBAN Number"
            value={newAccount.ifscCode}
            onChange={(value) =>
              setNewAccount((prev) => ({ ...prev, ifscCode: value }))
            }
            placeholder="Enter IBAN number"
            required
            error={errors.ifscCode}
          />

          <button
            onClick={handleAddAccount}
            disabled={isLoading}
            className="w-full h-11 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Adding..." : "Add Account"}
          </button>
        </div>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal
        isOpen={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        size="sm"
      >
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Remove Bank Account?
          </h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to remove this bank account? This action
            cannot be undone.
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => setShowConfirmDelete(false)}
              className="flex-1 h-11 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              disabled={isLoading}
              className="flex-1 h-11 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Removing..." : "Remove"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
