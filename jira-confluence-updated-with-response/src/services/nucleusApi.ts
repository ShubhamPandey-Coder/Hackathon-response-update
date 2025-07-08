
import axios from 'axios';

export interface Document {
  documentUniqueId: string;
  docStructureRelativePath: string;
  documentName: string;
}

export interface Citation {
  document: Document;
  text: string;
  uid: string;
  referenceUrl: string;
  internalReference: boolean;
}

export interface NucleusApiResponse {
  citiation: Citation[];
}

export const fetchCitations = async (keyword: string, apiToken: string): Promise<Citation[]> => {
  const url = '/api/api/v1/talk2docs-service/chat/organizations/test_hackathon_2025_0508/documents/stream';
  
  const payload = {
    history: [
      { role: 'user', content: keyword }
    ],
    queryMessages: [
      { role: 'user', content: keyword }
    ],
    documentPhrase: null,
    documentIdList: null,
    documentLabels: null
  };

  try {
    const { data } = await axios.post<NucleusApiResponse>(url, payload, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${apiToken}`
      }
    });

    return data.citiation || [];
  } catch (error) {
    console.error('Error fetching citations:', error);
    throw error;
  }
};
