import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiCalendar, FiX, FiPhone, FiMail, FiMessageSquare, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('https://localhost:5000/api/contacts');
        if (!response.ok) {
          throw new Error('Failed to fetch contacts');
        }
        const data = await response.json();
        setContacts(data);
        setFilteredContacts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    let results = contacts;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(contact => 
        contact.name.toLowerCase().includes(term) ||
        contact.email.toLowerCase().includes(term) ||
        contact.mobile.toLowerCase().includes(term) ||
        contact.subject.toLowerCase().includes(term) ||
        contact.message.toLowerCase().includes(term)
      );
    }
    
    if (dateFilter) {
      results = results.filter(contact => {
        const contactDate = new Date(contact.createdAt).toISOString().split('T')[0];
        return contactDate === dateFilter;
      });
    }
    
    if (sortConfig.key) {
      results = [...results].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredContacts(results);
  }, [contacts, searchTerm, dateFilter, sortConfig]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const resetFilters = () => {
    setSearchTerm('');
    setDateFilter('');
    setSortConfig({ key: 'createdAt', direction: 'desc' });
  };

  const openContactModal = (contact) => {
    setSelectedContact(contact);
  };

  const closeContactModal = () => {
    setSelectedContact(null);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />;
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-800 mb-8 text-center"
      >
        Messages
      </motion.h1>

      {/* Filters Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6 bg-white rounded-lg shadow p-4"
      >
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        >
          <h2 className="text-lg font-semibold text-gray-700">Filters</h2>
          {isFiltersOpen ? <FiChevronUp /> : <FiChevronDown />}
        </div>
        
        <AnimatePresence>
          {isFiltersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search contacts..."
                    className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiCalendar className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center">
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Reset Filters
                  </button>
                  <span className="ml-4 text-sm text-gray-500">
                    Showing {filteredContacts.length} of {contacts.length} contacts
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {filteredContacts.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-8 bg-white rounded-lg shadow"
        >
          <p className="text-gray-500 text-lg">No contact submissions found</p>
          {(searchTerm || dateFilter) && (
            <button
              onClick={resetFilters}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Clear filters
            </button>
          )}
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-lg shadow"
        >
          <div className="divide-y divide-gray-200">
            {filteredContacts.map((contact) => (
              <div
                key={contact._id}
                className="p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => openContactModal(contact)}
              >
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium text-gray-900">
                    A message from {contact.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatDateTime(contact.createdAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Contact Details Modal */}
      <AnimatePresence>
        {selectedContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={closeContactModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center border-b p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Message from {selectedContact.name}
                </h3>
                <button
                  onClick={closeContactModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={24} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Email</h4>
                    <p className="mt-1 text-gray-900">{selectedContact.email}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                    <p className="mt-1 text-gray-900">{selectedContact.mobile}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Country</h4>
                    <p className="mt-1 text-gray-900">{selectedContact.country}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Date</h4>
                    <p className="mt-1 text-gray-900">
                      {formatDateTime(selectedContact.createdAt)}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <h4 className="text-sm font-medium text-gray-500">Subject</h4>
                    <p className="mt-1 text-gray-900">{selectedContact.subject}</p>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Message</h4>
                  <p className="whitespace-pre-line text-gray-700 p-3 bg-gray-50 rounded">
                    {selectedContact.message}
                  </p>
                </div>
              </div>
              <div className="border-t p-4 flex justify-end space-x-3">
                {selectedContact.mobile && (
                  <a
                    href={`tel:${selectedContact.mobile}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <FiPhone className="mr-2" />
                    Call
                  </a>
                )}
                <a
                  href={`mailto:${selectedContact.email}`}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  <FiMail className="mr-2" />
                  Email
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactsList;