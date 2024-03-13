<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->uuid('uuid')->unique();
            $table->string('first_name')->nullable()->default(null);
            $table->string('middle_name')->nullable()->default(null);
            $table->string('last_name')->nullable()->default(null);
            $table->string('suffix')->nullable()->default(null);
            $table->string('email')->nullable()->default(null);
            $table->timestamp('email_verified_at')->nullable()->default(null);
            $table->string('contact_number')->nullable()->default(null);
            $table->string('username')->unique()->nullable()->default(null);
            $table->string('password')->nullable()->default(null);
            $table->string('gender')->nullable()->default(null);
            $table->string('civil_status')->nullable()->default(null);
            $table->date('date_of_birth')->nullable()->default(null);
            $table->longText('address')->nullable()->default(null);
            $table->date('date_of_death')->nullable()->default(null);
            $table->uuid('church_id')->nullable()->default(null);
            $table->uuid('church_position_id')->nullable()->default(null);
            $table->uuid('role_id')->nullable()->default(null);
            $table->rememberToken();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
