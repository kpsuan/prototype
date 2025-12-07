import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { questionsService, checkpointsService, usersService } from '../services';

const initialState = {
  questions: [],
  checkpoints: [],
  team: [],
  sections: [],
  currentQuestion: null,
  currentSection: 1,
  responses: {},
  loading: false,
  error: null
};

const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_QUESTIONS: 'SET_QUESTIONS',
  SET_CHECKPOINTS: 'SET_CHECKPOINTS',
  SET_TEAM: 'SET_TEAM',
  SET_SECTIONS: 'SET_SECTIONS',
  SET_CURRENT_QUESTION: 'SET_CURRENT_QUESTION',
  SET_CURRENT_SECTION: 'SET_CURRENT_SECTION',
  SET_RESPONSE: 'SET_RESPONSE'
};

function questionnaireReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    case ACTIONS.SET_QUESTIONS:
      return { ...state, questions: action.payload, loading: false };
    case ACTIONS.SET_CHECKPOINTS:
      return { ...state, checkpoints: action.payload };
    case ACTIONS.SET_TEAM:
      return { ...state, team: action.payload };
    case ACTIONS.SET_SECTIONS:
      return { ...state, sections: action.payload };
    case ACTIONS.SET_CURRENT_QUESTION:
      return { ...state, currentQuestion: action.payload };
    case ACTIONS.SET_CURRENT_SECTION:
      return { ...state, currentSection: action.payload };
    case ACTIONS.SET_RESPONSE:
      return { ...state, responses: { ...state.responses, [action.payload.questionId]: action.payload.value }};
    default:
      return state;
  }
}

const QuestionnaireContext = createContext(null);

export function QuestionnaireProvider({ children }) {
  const [state, dispatch] = useReducer(questionnaireReducer, initialState);

  useEffect(() => {
    const fetchInitialData = async () => {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      try {
        const [questionsRes, checkpointsRes, teamRes, sectionsRes] = await Promise.all([
          questionsService.getAll(),
          checkpointsService.getAll(),
          usersService.getTeam(),
          usersService.getSections()
        ]);

        dispatch({ type: ACTIONS.SET_QUESTIONS, payload: questionsRes.data });
        dispatch({ type: ACTIONS.SET_CHECKPOINTS, payload: checkpointsRes.data });
        dispatch({ type: ACTIONS.SET_TEAM, payload: teamRes.data });
        dispatch({ type: ACTIONS.SET_SECTIONS, payload: sectionsRes.data });
      } catch (error) {
        dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      }
    };

    fetchInitialData();
  }, []);

  const actions = {
    setCurrentQuestion: (question) => dispatch({ type: ACTIONS.SET_CURRENT_QUESTION, payload: question }),
    setCurrentSection: (sectionId) => dispatch({ type: ACTIONS.SET_CURRENT_SECTION, payload: sectionId }),
    saveResponse: async (questionId, value) => {
      dispatch({ type: ACTIONS.SET_RESPONSE, payload: { questionId, value }});
    },
    getCheckpointsForQuestion: (questionId) => {
      const question = state.questions.find(q => q.id === questionId);
      if (!question?.checkpointIds) return [];
      return state.checkpoints.filter(cp => question.checkpointIds.includes(cp.id));
    },
    getQuestionsForSection: (sectionId) => state.questions.filter(q => q.section === sectionId)
  };

  return (
    <QuestionnaireContext.Provider value={{ state, ...actions }}>
      {children}
    </QuestionnaireContext.Provider>
  );
}

export function useQuestionnaire() {
  const context = useContext(QuestionnaireContext);
  if (!context) throw new Error('useQuestionnaire must be used within a QuestionnaireProvider');
  return context;
}
