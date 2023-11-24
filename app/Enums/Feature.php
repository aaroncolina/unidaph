<?php

namespace App\Enums;

enum Feature: string
{
    case ACCESS = 'access';
    case EDIT_OWN_PROFILE = 'edit_own_profile';

    case GENERATE_REPORTS = 'generate_reports';

    case ADD_ROLE = 'add_role';
    case EDIT_ROLE = 'edit_role';
    case EDIT_ROLE_FEATURE = 'edit_role_feature';
    case DELETE_ROLE = 'delete_role';

    case VIEW_USER = 'view_user';
    case ADD_USER = 'add_user';
    case EDIT_USER = 'edit_user';
    case EDIT_USER_FEATURE = 'edit_user_feature';
    case DELETE_USER = 'delete_user';

    case ADD_CHURCH = 'add_church';
    case EDIT_CHURCH = 'edit_church';
    case DELETE_CHURCH = 'delete_church';

    case ACCESS_NATIONAL_RECORDS = 'access_national_records';
    case ACCESS_DISTRICT_RECORDS = 'access_district_records';
    case ACCESS_LOCAL_RECORDS = 'access_local_records';
}
