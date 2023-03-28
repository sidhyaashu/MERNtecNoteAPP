import {
    createSelector,
    createEntityAdapter
} from '@reduxjs/toolkit';
import { apiSlice } from '../../app/apiSlice';

const userAdapter = createEntityAdapter({})

const initialState = userAdapter.getInitialState()