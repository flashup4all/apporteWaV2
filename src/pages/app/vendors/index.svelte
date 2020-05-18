<script>
	import { onMount } from 'svelte'
    import { goto, url } from "@sveltech/routify";
    import { axiosInstance } from '../../../interceptor/index.js'
    import { get_user, get_token } from '../../../localstore'
    import PageHeader from "../_components/PageHeader.svelte";

    let auth_form = { email: "", password: "" }
    let user = get_user();
    let vendors = [];
    let page = 0;
    let last_page;
    let vendor_types = [];

  // let form_error = false;
	onMount(() => {
     console.log(user)
     axiosInstance.get(`/vendor?page=${page}`)
        .then(response => {
            vendors = response.data.data.data;
            last_page = response.data.data.last_page
        })
        .catch(error => {
            //this.loader.hide()
        });
        //get vendor types
        axiosInstance.get(`/vendor-types`)
        .then(response => {
            vendor_types = response.data.data;
        })
        .catch(error => {
            //this.loader.hide()
        });
	})

    let mode = 0;
    let vendor_form = {}
    $: checkValid = (vendor_form.email && vendor_form.password )
    function set_mode(index){
        mode = index;
    }

    function create_vendor(form) {
        console.log(form)
    }

    function reset()
    {
        mode = 0;
        vendor_form = {}
    }

    function spawn_edit(obj){
        console.log(obj)
        mode = 2
    }
</script>
<div>
    <PageHeader title="Vendors" subtitle="Manage all Vendors" />

    <div class="row">
        {#if mode === 0}  
        <div class="col-md-12">
            <div class="main-card mb-3 card">
                <div class="card-header">

                    <div class="btn-actions-pane-right">
                        <div role="group" class="btn-group-sm btn-group">
                            <button class="active btn btn-primary" on:click={() => set_mode(1)}>New Vendor</button>
                        </div>
                    </div>
                </div>
                
                <div class="table-responsive">
                    <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                        <thead>
                        <tr>
                            <th class="text-center">#</th>
                            <th>Name</th>
                            <th class="text-center">State</th>
                            <th class="text-center">Status</th>
                            <th class="text-center">Created</th>
                            <th class="text-center">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {#each vendors as vendor, i}
                        <tr>
                            <td class="text-center text-muted">#345</td>
                            <td>
                                <div class="widget-content p-0">
                                    <div class="widget-content-wrapper">
                                        <div class="widget-content-left mr-3">
                                            <div class="widget-content-left">
                                                <img width="40" class="rounded-circle" src="assets/images/avatars/4.jpg" alt="">
                                            </div>
                                        </div>
                                        <div class="widget-content-left flex2">
                                            <div class="widget-heading">{vendor.name }</div>
                                            <div class="widget-subheading opacity-7">{ vendor.address}</div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td class="text-center">{ vendor.state }</td>
                            <td class="text-center">
                                {#if vendor.status === 'Active'}
                                <div class="badge badge-success">{ vendor.status }</div>
                                {/if}
                                {#if vendor.status === 'Pending' || vendor.status === 'pending'}
                                <div class="badge badge-warning">{ vendor.status }</div>
                                {/if}
                                {#if vendor.status === 'Cancelled'}
                                <div class="badge badge-danger">{ vendor.status }</div>
                                {/if}
                            </td>
                            <td class="text-center">
                                <div class="">{ vendor.created_at || " " }</div>
                            </td>
                            <td class="text-center">
                                <button type="button" id="PopoverCustomT-1" class="btn btn-outline-primary btn-sm" on:click={() => spawn_edit(vendor)}>Edit</button>
                                <button type="button" id="PopoverCustomT-1" class="btn btn-primary btn-sm">Details</button>
                            </td>
                        </tr>
                        {/each}
                        </tbody>
                    </table>
                </div>
                
            </div>
        </div>
         {/if}
        {#if mode === 1}
                <div class="container">
                    <div class="row justify-content-center align-items-center">
                        <div class="col-md-8">
                            <div class="main-card mb-3 card">
                                <div class="card-header" style="margin-bottom: 0px">
                                    <h5 class="card-title">New Vendor</h5>
                                    <div class="btn-actions-pane-right">
                                        <button on:click={reset} class="btn btn-light btn-icon"><i class="pe-7s-close-circle"></i></button>
                                    </div>
                                </div>
                            <form>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="pe-7s-user"></i></span>
                                    </div>
                                    <input type="email" class="form-control" bind:value={vendor_form.email} placeholder="email" autocomplete="email"  required>
                                </div>
                                <!-- <small class="form-error" >Email is required</small> -->
                                <div class="input-group mb-4">
                                    <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="pe-7s-lock"></i></span>
                                    </div>
                                    <input type="password" bind:value={vendor_form.password}  class="form-control" placeholder="Password" autocomplete="current-password" required>
                                </div>
                                <!-- <small class="form-error">Password is required</small> -->
                                <div class="row">
                                    <div class="col-6">
                                    <button type="button" on:click={() => create_vendor(vendor_form)} disabled={!checkValid} class="btn btn-primary px-4">Login</button>
                                    </div>
                                    <div class="col-6 text-right">
                                    <button type="button" class="btn btn-danger" on:click={reset}>Cancel</button>
                                    </div>
                                </div>
                                </form>
                        </div>
                    </div>
                </div>
            </div>
         {/if}
    </div>

</div>