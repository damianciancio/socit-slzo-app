import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, RefreshControl, SafeAreaView, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as userActions from '../store/actions/user';

const StatusScreen = props => {
    const dispatch = useDispatch();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        dispatch(userActions.fetchUserStatus()).finally(() => setIsLoading(false));
    }, [dispatch]);

    const onRefresh = useCallback(async () => {
        setIsRefreshing(true);
        dispatch(userActions.fetchUserStatus()).then(() => setIsRefreshing(false))
            .catch(err => console.log(err))
            .finally(() => setIsRefreshing(false)
            );
    }, [dispatch, setIsRefreshing])

    const currentUser = useSelector(state => state.user.currentUser);

    if (isLoading) {
        return <ActivityIndicator />;
    }

    return <SafeAreaView>
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            <Text>{JSON.stringify(currentUser)}</Text>
        </ScrollView>
    </SafeAreaView>;
}

export default StatusScreen;